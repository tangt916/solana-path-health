import { useCallback, useEffect, useMemo, useState } from "react";
import { Lock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LoadingSpinner,
  SuccessMessage,
  ErrorMessage,
  PageShell,
} from "@/components/ui/shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { updateProfile as vendorUpdateProfile } from "@/lib/api";

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
}

const LOCKED_STATUSES = ["ASSIGNED", "IN_PROGRESS", "APPROVED", "REJECTED"];

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [caseStatus, setCaseStatus] = useState<string | null>(null);
  const [form, setForm] = useState<ProfileForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  const lockIdentity = useMemo(
    () =>
      caseStatus
        ? LOCKED_STATUSES.includes(caseStatus.toUpperCase())
        : false,
    [caseStatus]
  );

  const load = useCallback(async () => {
    if (!user?.email) return;
    setLoading(true);
    setLoadError(null);
    try {
      const [{ data: patient }, { data: customer }, { data: caseRow }] =
        await Promise.all([
          supabase
            .from("patients")
            .select("first_name, last_name, phone, dob, gender, address")
            .eq("email", user.email)
            .maybeSingle(),
          supabase
            .from("customers")
            .select(
              "name, phone, date_of_birth, address_line1, address_line2, city, state, zip"
            )
            .eq("user_id", user.id)
            .maybeSingle(),
          supabase
            .from("cases")
            .select("status")
            .eq("email", user.email)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle(),
        ]);

      const addr = (patient?.address ?? {}) as Record<string, string>;

      setForm({
        firstName: patient?.first_name ?? "",
        lastName: patient?.last_name ?? "",
        email: user.email,
        phone: patient?.phone ?? customer?.phone ?? "",
        dob: patient?.dob ?? customer?.date_of_birth ?? "",
        gender: patient?.gender ?? "",
        addressLine1: addr.line1 ?? customer?.address_line1 ?? "",
        addressLine2: addr.line2 ?? customer?.address_line2 ?? "",
        city: addr.city ?? customer?.city ?? "",
        state: addr.state ?? customer?.state ?? "",
        zip: addr.zip ?? customer?.zip ?? "",
      });
      setCaseStatus(caseRow?.status ?? null);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const handleChange = (field: keyof ProfileForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
    setSaveError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;
    setSaving(true);
    setSaved(false);
    setSaveError(null);

    try {
      const address = {
        line1: form.addressLine1,
        line2: form.addressLine2,
        city: form.city,
        state: form.state,
        zip: form.zip,
      };

      // Build patient payload — omit identity fields if locked
      const patientPayload = {
        email: user.email,
        phone: form.phone || null,
        address,
        ...(lockIdentity
          ? {}
          : {
              first_name: form.firstName,
              last_name: form.lastName,
              dob: form.dob || null,
              gender: form.gender || null,
            }),
      };

      const { error: patientErr } = await supabase
        .from("patients")
        .upsert(patientPayload as never, { onConflict: "email" });
      if (patientErr) throw patientErr;

      // customers (per-user)
      const customerPayload = {
        user_id: user.id,
        email: user.email,
        phone: form.phone || null,
        address_line1: form.addressLine1 || null,
        address_line2: form.addressLine2 || null,
        city: form.city || null,
        state: form.state || null,
        zip: form.zip || null,
        ...(lockIdentity
          ? {}
          : {
              name: `${form.firstName} ${form.lastName}`.trim() || null,
              date_of_birth: form.dob || null,
            }),
      };

      const { error: customerErr } = await supabase
        .from("customers")
        .upsert(customerPayload as never, { onConflict: "user_id" });
      if (customerErr) throw customerErr;

      // Best-effort vendor sync
      try {
        await vendorUpdateProfile({
          email: user.email,
          firstName: lockIdentity ? undefined : form.firstName,
          lastName: lockIdentity ? undefined : form.lastName,
          phone: form.phone,
          address,
        } as any);
      } catch (vendorErr) {
        // Vendor not configured (e.g. CareValidate key missing) — non-fatal
        console.warn("Vendor profile sync skipped:", vendorErr);
      }

      setSaved(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <PageShell
          title="Profile"
          subtitle="Update your contact details and shipping address."
          showBack
          onBack={() => window.history.back()}
        >
          {loading && (
            <div className="py-12">
              <LoadingSpinner label="Loading your profile..." />
            </div>
          )}

          {!loading && loadError && (
            <ErrorMessage
              title="Could not load profile"
              message={loadError}
              onRetry={load}
            />
          )}

          {!loading && !loadError && (
            <Card className="p-6 sm:p-8">
              {saved && (
                <div className="mb-4">
                  <SuccessMessage
                    variant="inline"
                    title="Profile saved"
                    message="Your changes have been updated."
                  />
                </div>
              )}
              {saveError && (
                <div className="mb-4">
                  <ErrorMessage
                    variant="inline"
                    title="Could not save"
                    message={saveError}
                  />
                </div>
              )}

              {lockIdentity && (
                <p className="text-xs text-muted-foreground bg-muted/50 border border-border rounded-md p-3 mb-6">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Some identity fields are locked because your case is in
                  review. Contact support to update them.
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <LockableField
                    locked={lockIdentity}
                    label="First name"
                    htmlFor="firstName"
                  >
                    <Input
                      id="firstName"
                      value={form.firstName}
                      disabled={lockIdentity}
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      required
                    />
                  </LockableField>
                  <LockableField
                    locked={lockIdentity}
                    label="Last name"
                    htmlFor="lastName"
                  >
                    <Input
                      id="lastName"
                      value={form.lastName}
                      disabled={lockIdentity}
                      onChange={(e) =>
                        handleChange("lastName", e.target.value)
                      }
                      required
                    />
                  </LockableField>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={form.email} disabled />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <LockableField
                    locked={lockIdentity}
                    label="Date of birth"
                    htmlFor="dob"
                  >
                    <Input
                      id="dob"
                      type="date"
                      value={form.dob}
                      disabled={lockIdentity}
                      onChange={(e) => handleChange("dob", e.target.value)}
                    />
                  </LockableField>
                  <LockableField
                    locked={lockIdentity}
                    label="Sex assigned at birth"
                    htmlFor="gender"
                  >
                    <Select
                      value={form.gender}
                      onValueChange={(v) => handleChange("gender", v)}
                      disabled={lockIdentity}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </LockableField>
                </div>

                <div>
                  <Label htmlFor="addr1">Address line 1</Label>
                  <Input
                    id="addr1"
                    value={form.addressLine1}
                    onChange={(e) =>
                      handleChange("addressLine1", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="addr2">Address line 2</Label>
                  <Input
                    id="addr2"
                    value={form.addressLine2}
                    onChange={(e) =>
                      handleChange("addressLine2", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={form.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={form.state}
                      maxLength={2}
                      onChange={(e) =>
                        handleChange("state", e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP</Label>
                    <Input
                      id="zip"
                      value={form.zip}
                      onChange={(e) => handleChange("zip", e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save changes"}
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </PageShell>
      </main>
      <Footer />
    </div>
  );
};

const LockableField = ({
  locked,
  label,
  htmlFor,
  children,
}: {
  locked: boolean;
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center gap-1.5 mb-1.5">
      <Label htmlFor={htmlFor} className="m-0">
        {label}
      </Label>
      {locked && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Lock className="w-3 h-3 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs max-w-[200px]">
              Locked while your case is being reviewed. Contact support to
              change.
            </p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
    {children}
  </div>
);

export default Profile;

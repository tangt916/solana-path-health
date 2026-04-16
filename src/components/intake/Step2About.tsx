import { useIntakeForm } from "@/contexts/IntakeFormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format, differenceInYears, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

interface Props {
  onBack: () => void;
  onNext: () => void;
}

export const Step2About = ({ onBack, onNext }: Props) => {
  const { state, updateAbout } = useIntakeForm();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dobDate = state.aboutInfo.dob ? parseISO(state.aboutInfo.dob) : undefined;

  const handleNext = () => {
    const errs: Record<string, string> = {};
    if (!state.aboutInfo.dob) errs.dob = "Date of birth required";
    else if (differenceInYears(new Date(), parseISO(state.aboutInfo.dob)) < 18)
      errs.dob = "You must be 18 or older";
    if (!state.aboutInfo.gender) errs.gender = "Required";
    if (!state.aboutInfo.state) errs.state = "Required";
    if (!state.aboutInfo.addressLine1.trim()) errs.addressLine1 = "Required";
    if (!state.aboutInfo.city.trim()) errs.city = "Required";
    if (!state.aboutInfo.zip.trim()) errs.zip = "Required";
    setErrors(errs);
    if (Object.keys(errs).length === 0) onNext();
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl sm:text-3xl mb-1">About you</h2>
        <p className="text-muted-foreground text-sm">We need this to verify eligibility and ship medication.</p>
      </div>

      <div>
        <Label>Date of birth</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal mt-1",
                !dobDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dobDate ? format(dobDate, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dobDate}
              onSelect={(d) => updateAbout({ dob: d ? d.toISOString().slice(0, 10) : "" })}
              disabled={(d) => d > new Date() || d < new Date("1900-01-01")}
              initialFocus
              captionLayout="dropdown-buttons"
              fromYear={1900}
              toYear={new Date().getFullYear()}
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob}</p>}
      </div>

      <div>
        <Label>Sex assigned at birth</Label>
        <div className="flex gap-2 mt-1">
          {(["MALE", "FEMALE"] as const).map((g) => (
            <Button
              key={g}
              type="button"
              variant={state.aboutInfo.gender === g ? "default" : "outline"}
              className="flex-1"
              onClick={() => updateAbout({ gender: g })}
            >
              {g === "MALE" ? "Male" : "Female"}
            </Button>
          ))}
        </div>
        {errors.gender && <p className="text-xs text-destructive mt-1">{errors.gender}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>State</Label>
          <Select value={state.aboutInfo.state} onValueChange={(v) => updateAbout({ state: v })}>
            <SelectTrigger className="mt-1"><SelectValue placeholder="Select state" /></SelectTrigger>
            <SelectContent>
              {US_STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
        </div>
        <div>
          <Label htmlFor="zip">ZIP</Label>
          <Input
            id="zip"
            value={state.aboutInfo.zip}
            onChange={(e) => updateAbout({ zip: e.target.value })}
            maxLength={10}
          />
          {errors.zip && <p className="text-xs text-destructive mt-1">{errors.zip}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="addr1">Address line 1</Label>
        <Input
          id="addr1"
          value={state.aboutInfo.addressLine1}
          onChange={(e) => updateAbout({ addressLine1: e.target.value })}
        />
        {errors.addressLine1 && <p className="text-xs text-destructive mt-1">{errors.addressLine1}</p>}
      </div>

      <div>
        <Label htmlFor="addr2">Address line 2 (optional)</Label>
        <Input
          id="addr2"
          value={state.aboutInfo.addressLine2}
          onChange={(e) => updateAbout({ addressLine2: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={state.aboutInfo.city}
          onChange={(e) => updateAbout({ city: e.target.value })}
        />
        {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack} className="flex-1">Back</Button>
        <Button onClick={handleNext} className="flex-1">Continue</Button>
      </div>
    </div>
  );
};

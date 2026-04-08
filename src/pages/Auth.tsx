import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import Header from "@/components/layout/Header";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: would call supabase.auth.signInWithOtp({ email })
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-muted/30">
        <Header />
        <div className="container flex items-center justify-center py-20">
          <div className="mx-auto max-w-sm text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We sent a login link to <span className="font-medium text-foreground">{email}</span>. Click the link to sign in.
            </p>
            <Button variant="ghost" className="mt-6" onClick={() => setSent(false)}>
              Use a different email
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <div className="container flex items-center justify-center py-20">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your Solana Health account</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Send login link
              </Button>
            </form>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              We'll email you a magic link for a password-free sign in.
            </p>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link to="/quiz" className="font-medium text-primary hover:underline">
              Check your eligibility
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;

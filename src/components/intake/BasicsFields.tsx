import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "./health-data";

interface Props {
  state: string;
  heightFeet: string;
  heightInches: string;
  weightLbs: string;
  goalWeight: string;
  errors: Record<string, string>;
  update: (patch: Record<string, string>) => void;
}

export const BasicsFields = ({
  state, heightFeet, heightInches, weightLbs, goalWeight, errors, update,
}: Props) => (
  <>
    <div className="space-y-1.5">
      <Label htmlFor="state">What state do you live in?</Label>
      <Select value={state || undefined} onValueChange={(v) => update({ state: v })}>
        <SelectTrigger id="state" aria-invalid={!!errors.state}>
          <SelectValue placeholder="Select your state" />
        </SelectTrigger>
        <SelectContent>
          {US_STATES.map((s) => (
            <SelectItem key={s.code} value={s.code}>{s.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
    </div>

    <div className="space-y-1.5">
      <Label>Height</Label>
      <div className="grid grid-cols-2 gap-3">
        <Select value={heightFeet || undefined} onValueChange={(v) => update({ heightFeet: v })}>
          <SelectTrigger aria-invalid={!!errors.heightFeet}>
            <SelectValue placeholder="Feet" />
          </SelectTrigger>
          <SelectContent>
            {[4, 5, 6, 7].map((ft) => (
              <SelectItem key={ft} value={String(ft)}>{ft} ft</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={heightInches || undefined} onValueChange={(v) => update({ heightInches: v })}>
          <SelectTrigger><SelectValue placeholder="Inches" /></SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }).map((_, i) => (
              <SelectItem key={i} value={String(i)}>{i} in</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {errors.heightFeet && <p className="text-xs text-destructive mt-1">{errors.heightFeet}</p>}
    </div>

    <div className="space-y-1.5">
      <Label htmlFor="weight">Current weight (lbs)</Label>
      <Input
        id="weight" type="number" inputMode="numeric" value={weightLbs}
        onChange={(e) => update({ weightLbs: e.target.value })}
        aria-invalid={!!errors.weightLbs} placeholder="e.g. 210"
      />
      {errors.weightLbs && <p className="text-xs text-destructive mt-1">{errors.weightLbs}</p>}
    </div>

    <div className="space-y-1.5">
      <Label htmlFor="goalWeight">Goal weight (lbs)</Label>
      <Input
        id="goalWeight" type="number" inputMode="numeric" value={goalWeight}
        onChange={(e) => update({ goalWeight: e.target.value })}
        aria-invalid={!!errors.goalWeight} placeholder="e.g. 175"
      />
      {errors.goalWeight && <p className="text-xs text-destructive mt-1">{errors.goalWeight}</p>}
    </div>
  </>
);

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      appointments: {
        Row: {
          case_id: string | null
          created_at: string
          email: string | null
          end_time: string | null
          id: string
          meeting_link: string | null
          patient_id: string | null
          provider_email: string | null
          provider_name: string | null
          start_time: string | null
          status: string | null
          timezone: string | null
          vendor_appointment_id: string | null
          vendor_name: string | null
        }
        Insert: {
          case_id?: string | null
          created_at?: string
          email?: string | null
          end_time?: string | null
          id?: string
          meeting_link?: string | null
          patient_id?: string | null
          provider_email?: string | null
          provider_name?: string | null
          start_time?: string | null
          status?: string | null
          timezone?: string | null
          vendor_appointment_id?: string | null
          vendor_name?: string | null
        }
        Update: {
          case_id?: string | null
          created_at?: string
          email?: string | null
          end_time?: string | null
          id?: string
          meeting_link?: string | null
          patient_id?: string | null
          provider_email?: string | null
          provider_name?: string | null
          start_time?: string | null
          status?: string | null
          timezone?: string | null
          vendor_appointment_id?: string | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          id: string
          ip_address: string | null
          occurred_at: string
          resource_id: string | null
          resource_type: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: string
          ip_address?: string | null
          occurred_at?: string
          resource_id?: string | null
          resource_type?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: string
          ip_address?: string | null
          occurred_at?: string
          resource_id?: string | null
          resource_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cases: {
        Row: {
          amount_paid: number | null
          created_at: string
          discount_applied: number | null
          email: string | null
          id: string
          original_amount: number | null
          patient_id: string | null
          plan_months: number | null
          promo_code_used: string | null
          status: string | null
          stripe_payment_id: string | null
          updated_at: string
          vendor_case_id: string | null
          vendor_name: string | null
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string
          discount_applied?: number | null
          email?: string | null
          id?: string
          original_amount?: number | null
          patient_id?: string | null
          plan_months?: number | null
          promo_code_used?: string | null
          status?: string | null
          stripe_payment_id?: string | null
          updated_at?: string
          vendor_case_id?: string | null
          vendor_name?: string | null
        }
        Update: {
          amount_paid?: number | null
          created_at?: string
          discount_applied?: number | null
          email?: string | null
          id?: string
          original_amount?: number | null
          patient_id?: string | null
          plan_months?: number | null
          promo_code_used?: string | null
          status?: string | null
          stripe_payment_id?: string | null
          updated_at?: string
          vendor_case_id?: string | null
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cases_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      consents: {
        Row: {
          agreed: boolean
          agreed_at: string
          consent_text_version: string
          consent_type: string
          id: string
          ip_address: string | null
          user_id: string
        }
        Insert: {
          agreed?: boolean
          agreed_at?: string
          consent_text_version?: string
          consent_type: string
          id?: string
          ip_address?: string | null
          user_id: string
        }
        Update: {
          agreed?: boolean
          agreed_at?: string
          consent_text_version?: string
          consent_type?: string
          id?: string
          ip_address?: string | null
          user_id?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          created_at: string
          date_of_birth: string | null
          deleted_at: string | null
          email: string | null
          id: string
          name: string | null
          phone: string | null
          state: string | null
          updated_at: string
          user_id: string
          zip: string | null
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
          zip?: string | null
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          created_at?: string
          date_of_birth?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
          zip?: string | null
        }
        Relationships: []
      }
      error_logs: {
        Row: {
          context: string | null
          created_at: string
          error: string | null
          id: string
          patient_email: string | null
          payload: Json | null
        }
        Insert: {
          context?: string | null
          created_at?: string
          error?: string | null
          id?: string
          patient_email?: string | null
          payload?: Json | null
        }
        Update: {
          context?: string | null
          created_at?: string
          error?: string | null
          id?: string
          patient_email?: string | null
          payload?: Json | null
        }
        Relationships: []
      }
      intake_submissions: {
        Row: {
          age: number
          bmi: number | null
          current_medications: boolean
          has_medical_conditions: boolean
          height_feet: number
          height_inches: number
          id: string
          is_pregnant_or_planning: boolean
          medical_conditions_detail: string | null
          medications_detail: string | null
          reviewed_at: string | null
          reviewer_notes: string | null
          state: string
          status: string
          submitted_at: string
          tried_programs_before: string | null
          user_id: string
          weight_lbs: number
          weight_loss_goal: string | null
        }
        Insert: {
          age: number
          bmi?: number | null
          current_medications?: boolean
          has_medical_conditions?: boolean
          height_feet: number
          height_inches?: number
          id?: string
          is_pregnant_or_planning?: boolean
          medical_conditions_detail?: string | null
          medications_detail?: string | null
          reviewed_at?: string | null
          reviewer_notes?: string | null
          state: string
          status?: string
          submitted_at?: string
          tried_programs_before?: string | null
          user_id: string
          weight_lbs: number
          weight_loss_goal?: string | null
        }
        Update: {
          age?: number
          bmi?: number | null
          current_medications?: boolean
          has_medical_conditions?: boolean
          height_feet?: number
          height_inches?: number
          id?: string
          is_pregnant_or_planning?: boolean
          medical_conditions_detail?: string | null
          medications_detail?: string | null
          reviewed_at?: string | null
          reviewer_notes?: string | null
          state?: string
          status?: string
          submitted_at?: string
          tried_programs_before?: string | null
          user_id?: string
          weight_lbs?: number
          weight_loss_goal?: string | null
        }
        Relationships: []
      }
      marketing_leads: {
        Row: {
          converted_to_patient: boolean | null
          created_at: string
          email: string | null
          email_opt_in: boolean | null
          first_name: string | null
          id: string
          last_name: string | null
          patient_id: string | null
          phone: string | null
          promo_code: string | null
          promo_expiry: string | null
          promo_used: boolean | null
          sms_opt_in: boolean | null
          source: string | null
        }
        Insert: {
          converted_to_patient?: boolean | null
          created_at?: string
          email?: string | null
          email_opt_in?: boolean | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          patient_id?: string | null
          phone?: string | null
          promo_code?: string | null
          promo_expiry?: string | null
          promo_used?: boolean | null
          sms_opt_in?: boolean | null
          source?: string | null
        }
        Update: {
          converted_to_patient?: boolean | null
          created_at?: string
          email?: string | null
          email_opt_in?: boolean | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          patient_id?: string | null
          phone?: string | null
          promo_code?: string | null
          promo_expiry?: string | null
          promo_used?: boolean | null
          sms_opt_in?: boolean | null
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "marketing_leads_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_queue: {
        Row: {
          created_at: string
          email: string | null
          error: string | null
          id: string
          payload: Json | null
          sent: boolean
          sent_at: string | null
          type: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          error?: string | null
          id?: string
          payload?: Json | null
          sent?: boolean
          sent_at?: string | null
          type: string
        }
        Update: {
          created_at?: string
          email?: string | null
          error?: string | null
          id?: string
          payload?: Json | null
          sent?: boolean
          sent_at?: string | null
          type?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          id: string
          month_number: number
          order_number: string
          prescription_id: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          month_number?: number
          order_number: string
          prescription_id?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          month_number?: number
          order_number?: string
          prescription_id?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_messages: {
        Row: {
          author_name: string | null
          created_at: string
          id: string
          read: boolean
          text: string
          vendor_case_id: string
        }
        Insert: {
          author_name?: string | null
          created_at?: string
          id?: string
          read?: boolean
          text: string
          vendor_case_id: string
        }
        Update: {
          author_name?: string | null
          created_at?: string
          id?: string
          read?: boolean
          text?: string
          vendor_case_id?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          address: Json | null
          converted_at: string | null
          created_at: string
          dob: string | null
          email: string
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          phone: string | null
          referral_code: string | null
          referred_by: string | null
        }
        Insert: {
          address?: Json | null
          converted_at?: string | null
          created_at?: string
          dob?: string | null
          email: string
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
        }
        Update: {
          address?: Json | null
          converted_at?: string | null
          created_at?: string
          dob?: string | null
          email?: string
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          referral_code?: string | null
          referred_by?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_cents: number
          created_at: string
          failure_reason: string | null
          id: string
          status: string
          stripe_payment_intent_id: string | null
          subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          failure_reason?: string | null
          id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          failure_reason?: string | null
          id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          dosage: string | null
          id: string
          intake_id: string | null
          medication_name: string
          prescribed_at: string
          prescribing_provider: string | null
          status: string
          user_id: string
        }
        Insert: {
          dosage?: string | null
          id?: string
          intake_id?: string | null
          medication_name: string
          prescribed_at?: string
          prescribing_provider?: string | null
          status?: string
          user_id: string
        }
        Update: {
          dosage?: string | null
          id?: string
          intake_id?: string | null
          medication_name?: string
          prescribed_at?: string
          prescribing_provider?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_intake_id_fkey"
            columns: ["intake_id"]
            isOneToOne: false
            referencedRelation: "intake_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          email: string | null
          id: string
          name: string | null
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string | null
          created_at: string
          discount_type: string | null
          discount_value: number | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          source: string | null
          use_count: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string
          discount_type?: string | null
          discount_value?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          source?: string | null
          use_count?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string
          discount_type?: string | null
          discount_value?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          source?: string | null
          use_count?: number | null
        }
        Relationships: []
      }
      referral_credits: {
        Row: {
          amount: number | null
          created_at: string
          email: string | null
          expires_at: string | null
          id: string
          patient_id: string | null
          reason: string | null
          used: boolean | null
          used_at: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          email?: string | null
          expires_at?: string | null
          id?: string
          patient_id?: string | null
          reason?: string | null
          used?: boolean | null
          used_at?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          email?: string | null
          expires_at?: string | null
          id?: string
          patient_id?: string | null
          reason?: string | null
          used?: boolean | null
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_credits_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          referral_code: string | null
          referred_email: string | null
          referred_patient_id: string | null
          referrer_email: string | null
          referrer_patient_id: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referral_code?: string | null
          referred_email?: string | null
          referred_patient_id?: string | null
          referrer_email?: string | null
          referrer_patient_id?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referral_code?: string | null
          referred_email?: string | null
          referred_patient_id?: string | null
          referrer_email?: string | null
          referrer_patient_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_patient_id_fkey"
            columns: ["referred_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_patient_id_fkey"
            columns: ["referrer_patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      shipment_events: {
        Row: {
          carrier: string | null
          estimated_delivery: string | null
          event_type: string
          id: string
          notes: string | null
          occurred_at: string
          order_id: string
          tracking_number: string | null
        }
        Insert: {
          carrier?: string | null
          estimated_delivery?: string | null
          event_type: string
          id?: string
          notes?: string | null
          occurred_at?: string
          order_id: string
          tracking_number?: string | null
        }
        Update: {
          carrier?: string | null
          estimated_delivery?: string | null
          event_type?: string
          id?: string
          notes?: string | null
          occurred_at?: string
          order_id?: string
          tracking_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shipment_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount_cents: number
          cancelled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          next_refill_date: string | null
          pause_end: string | null
          pause_start: string | null
          plan_name: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          user_id: string
        }
        Insert: {
          amount_cents?: number
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          next_refill_date?: string | null
          pause_end?: string | null
          pause_start?: string | null
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          next_refill_date?: string | null
          pause_end?: string | null
          pause_start?: string | null
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          admin_reply: string | null
          created_at: string
          email: string
          id: string
          message: string
          resolved_at: string | null
          status: string
          subject: string
          user_id: string | null
        }
        Insert: {
          admin_reply?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          resolved_at?: string | null
          status?: string
          subject: string
          user_id?: string | null
        }
        Update: {
          admin_reply?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          resolved_at?: string | null
          status?: string
          subject?: string
          user_id?: string | null
        }
        Relationships: []
      }
      webhook_events: {
        Row: {
          error: string | null
          event_type: string | null
          id: string
          payload: Json | null
          processed: boolean | null
          processed_at: string | null
          received_at: string
          vendor_case_id: string | null
          vendor_name: string | null
        }
        Insert: {
          error?: string | null
          event_type?: string | null
          id?: string
          payload?: Json | null
          processed?: boolean | null
          processed_at?: string | null
          received_at?: string
          vendor_case_id?: string | null
          vendor_name?: string | null
        }
        Update: {
          error?: string | null
          event_type?: string | null
          id?: string
          payload?: Json | null
          processed?: boolean | null
          processed_at?: string | null
          received_at?: string
          vendor_case_id?: string | null
          vendor_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      consents_safe: {
        Row: {
          agreed: boolean | null
          agreed_at: string | null
          consent_text_version: string | null
          consent_type: string | null
          id: string | null
          user_id: string | null
        }
        Insert: {
          agreed?: boolean | null
          agreed_at?: string | null
          consent_text_version?: string | null
          consent_type?: string | null
          id?: string | null
          user_id?: string | null
        }
        Update: {
          agreed?: boolean | null
          agreed_at?: string | null
          consent_text_version?: string | null
          consent_type?: string | null
          id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

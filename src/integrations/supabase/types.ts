export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_authors: {
        Row: {
          avatar: string | null
          bio: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          avatar?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string
          category_id: string
          content: string
          cover_image: string
          created_at: string
          excerpt: string
          id: string
          image_alt: string | null
          published_date: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category_id: string
          content: string
          cover_image: string
          created_at?: string
          excerpt: string
          id?: string
          image_alt?: string | null
          published_date?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category_id?: string
          content?: string
          cover_image?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_alt?: string | null
          published_date?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "blog_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      book_assets: {
        Row: {
          asset_name: string
          asset_url: string
          created_at: string
          id: string
        }
        Insert: {
          asset_name: string
          asset_url: string
          created_at?: string
          id?: string
        }
        Update: {
          asset_name?: string
          asset_url?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      book_images: {
        Row: {
          alt_text: string | null
          created_at: string
          description: string | null
          file_path: string
          id: string
          image_type: string
          name: string
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          description?: string | null
          file_path: string
          id?: string
          image_type: string
          name: string
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          description?: string | null
          file_path?: string
          id?: string
          image_type?: string
          name?: string
        }
        Relationships: []
      }
      cerberus_signups: {
        Row: {
          business_name: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string
          service: string
          status: string
          website: string | null
        }
        Insert: {
          business_name: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone: string
          service: string
          status?: string
          website?: string | null
        }
        Update: {
          business_name?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          service?: string
          status?: string
          website?: string | null
        }
        Relationships: []
      }
      chamber_giveaway: {
        Row: {
          business_name: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          prize_won: string
          status: string
          website: string | null
        }
        Insert: {
          business_name: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
          prize_won: string
          status?: string
          website?: string | null
        }
        Update: {
          business_name?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          prize_won?: string
          status?: string
          website?: string | null
        }
        Relationships: []
      }
      character_images: {
        Row: {
          character_name: string
          created_at: string
          id: string
          image_url: string
        }
        Insert: {
          character_name: string
          created_at?: string
          id?: string
          image_url: string
        }
        Update: {
          character_name?: string
          created_at?: string
          id?: string
          image_url?: string
        }
        Relationships: []
      }
      client_onboarding: {
        Row: {
          brand_description: string | null
          brand_values: string | null
          branding: boolean
          company_name: string
          company_size: string | null
          competitors: string | null
          contact_name: string
          created_at: string
          email: string
          email_automation: boolean
          email_customer_segments: string | null
          email_main_offer: string | null
          email_pain_point: string | null
          email_previous_experience: string | null
          email_products_to_promote: string | null
          email_solution: string | null
          email_success_goals: string | null
          email_tone: string | null
          email_typical_customer: string | null
          id: string
          industry: string | null
          phone: string
          social_content_approach: string | null
          social_content_help: string | null
          social_content_types: string | null
          social_inspiration: string | null
          social_media_seo: boolean
          social_platforms: string | null
          social_primary_goal: string | null
          social_tone: string | null
          social_topics: string | null
          target_audience: string | null
          website: string | null
          workflow_automation: boolean
          workflow_current_tools: string | null
          workflow_departments: string | null
          workflow_description: string | null
          workflow_dream_automation: string | null
          workflow_manual_processes: string | null
          workflow_pain_points: string | null
          workflow_repetitive_tasks: string | null
        }
        Insert: {
          brand_description?: string | null
          brand_values?: string | null
          branding?: boolean
          company_name: string
          company_size?: string | null
          competitors?: string | null
          contact_name: string
          created_at?: string
          email: string
          email_automation?: boolean
          email_customer_segments?: string | null
          email_main_offer?: string | null
          email_pain_point?: string | null
          email_previous_experience?: string | null
          email_products_to_promote?: string | null
          email_solution?: string | null
          email_success_goals?: string | null
          email_tone?: string | null
          email_typical_customer?: string | null
          id?: string
          industry?: string | null
          phone: string
          social_content_approach?: string | null
          social_content_help?: string | null
          social_content_types?: string | null
          social_inspiration?: string | null
          social_media_seo?: boolean
          social_platforms?: string | null
          social_primary_goal?: string | null
          social_tone?: string | null
          social_topics?: string | null
          target_audience?: string | null
          website?: string | null
          workflow_automation?: boolean
          workflow_current_tools?: string | null
          workflow_departments?: string | null
          workflow_description?: string | null
          workflow_dream_automation?: string | null
          workflow_manual_processes?: string | null
          workflow_pain_points?: string | null
          workflow_repetitive_tasks?: string | null
        }
        Update: {
          brand_description?: string | null
          brand_values?: string | null
          branding?: boolean
          company_name?: string
          company_size?: string | null
          competitors?: string | null
          contact_name?: string
          created_at?: string
          email?: string
          email_automation?: boolean
          email_customer_segments?: string | null
          email_main_offer?: string | null
          email_pain_point?: string | null
          email_previous_experience?: string | null
          email_products_to_promote?: string | null
          email_solution?: string | null
          email_success_goals?: string | null
          email_tone?: string | null
          email_typical_customer?: string | null
          id?: string
          industry?: string | null
          phone?: string
          social_content_approach?: string | null
          social_content_help?: string | null
          social_content_types?: string | null
          social_inspiration?: string | null
          social_media_seo?: boolean
          social_platforms?: string | null
          social_primary_goal?: string | null
          social_tone?: string | null
          social_topics?: string | null
          target_audience?: string | null
          website?: string | null
          workflow_automation?: boolean
          workflow_current_tools?: string | null
          workflow_departments?: string | null
          workflow_description?: string | null
          workflow_dream_automation?: string | null
          workflow_manual_processes?: string | null
          workflow_pain_points?: string | null
          workflow_repetitive_tasks?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          business_type: string
          created_at: string
          email: string
          id: string
          name: string
          phone_number: string | null
          problem: string
        }
        Insert: {
          business_type: string
          created_at?: string
          email: string
          id?: string
          name: string
          phone_number?: string | null
          problem: string
        }
        Update: {
          business_type?: string
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone_number?: string | null
          problem?: string
        }
        Relationships: []
      }
      ebook_products: {
        Row: {
          created_at: string
          description: string | null
          file_path: string | null
          id: string
          is_active: boolean | null
          price: number
          sku: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean | null
          price: number
          sku?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          file_path?: string | null
          id?: string
          is_active?: boolean | null
          price?: number
          sku?: string | null
          title?: string
        }
        Relationships: []
      }
      ebook_purchases: {
        Row: {
          amount: number
          created_at: string
          customer_email: string
          customer_name: string
          download_count: number | null
          download_link: string | null
          id: string
          last_downloaded: string | null
          make_webhook_processed: boolean | null
          payment_id: string | null
          payment_status: string | null
          product_id: string | null
          purchase_date: string | null
          quickbooks_reference: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          customer_email: string
          customer_name: string
          download_count?: number | null
          download_link?: string | null
          id?: string
          last_downloaded?: string | null
          make_webhook_processed?: boolean | null
          payment_id?: string | null
          payment_status?: string | null
          product_id?: string | null
          purchase_date?: string | null
          quickbooks_reference?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          customer_email?: string
          customer_name?: string
          download_count?: number | null
          download_link?: string | null
          id?: string
          last_downloaded?: string | null
          make_webhook_processed?: boolean | null
          payment_id?: string | null
          payment_status?: string | null
          product_id?: string | null
          purchase_date?: string | null
          quickbooks_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ebook_purchases_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "ebook_products"
            referencedColumns: ["id"]
          },
        ]
      }
      lead_funnel: {
        Row: {
          budget: string
          business_name: string
          created_at: string
          email: string
          full_name: string
          id: string
          notes: string | null
          project_description: string
          status: string
          website_url: string | null
        }
        Insert: {
          budget: string
          business_name: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          notes?: string | null
          project_description: string
          status?: string
          website_url?: string | null
        }
        Update: {
          budget?: string
          business_name?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          notes?: string | null
          project_description?: string
          status?: string
          website_url?: string | null
        }
        Relationships: []
      }
      payment_webhook_events: {
        Row: {
          created_at: string
          id: string
          payload: Json
          processed_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          payload: Json
          processed_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      strategy_call_bookings: {
        Row: {
          company_name: string
          created_at: string
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string
          preferred_date: string
          preferred_time: string
          service_interest: string | null
          status: string
          website: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          message?: string | null
          phone: string
          preferred_date: string
          preferred_time: string
          service_interest?: string | null
          status?: string
          website?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          phone?: string
          preferred_date?: string
          preferred_time?: string
          service_interest?: string | null
          status?: string
          website?: string | null
        }
        Relationships: []
      }
      strategy_form_submissions: {
        Row: {
          acquisition_channels: string[] | null
          business_description: string | null
          business_name: string | null
          created_at: string
          email: string
          first_name: string
          help_needed: string | null
          id: string
          ip_address: string | null
          last_name: string
          magic_wand_request: string | null
          massive_win: string | null
          monthly_revenue: string | null
          phone: string
          user_agent: string | null
          website: string | null
          whats_not_working: string | null
          whats_working: string | null
        }
        Insert: {
          acquisition_channels?: string[] | null
          business_description?: string | null
          business_name?: string | null
          created_at?: string
          email: string
          first_name: string
          help_needed?: string | null
          id?: string
          ip_address?: string | null
          last_name: string
          magic_wand_request?: string | null
          massive_win?: string | null
          monthly_revenue?: string | null
          phone: string
          user_agent?: string | null
          website?: string | null
          whats_not_working?: string | null
          whats_working?: string | null
        }
        Update: {
          acquisition_channels?: string[] | null
          business_description?: string | null
          business_name?: string | null
          created_at?: string
          email?: string
          first_name?: string
          help_needed?: string | null
          id?: string
          ip_address?: string | null
          last_name?: string
          magic_wand_request?: string | null
          massive_win?: string | null
          monthly_revenue?: string | null
          phone?: string
          user_agent?: string | null
          website?: string | null
          whats_not_working?: string | null
          whats_working?: string | null
        }
        Relationships: []
      }
      webhook_log: {
        Row: {
          created_at: string | null
          id: number
          payload: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: never
          payload?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: never
          payload?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_strategy_call: {
        Args: {
          p_full_name: string
          p_email: string
          p_phone: string
          p_company_name: string
          p_website: string
          p_preferred_date: string
          p_preferred_time: string
          p_service_interest: string
          p_message: string
        }
        Returns: {
          company_name: string
          created_at: string
          email: string
          full_name: string
          id: string
          message: string | null
          phone: string
          preferred_date: string
          preferred_time: string
          service_interest: string | null
          status: string
          website: string | null
        }[]
      }
      insert_webhook_event: {
        Args: { event_payload: Json }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

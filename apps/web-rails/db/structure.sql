SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;


--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry and geography spatial types and functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: announcements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.announcements (
    id bigint NOT NULL,
    title character varying NOT NULL,
    message text NOT NULL,
    status character varying DEFAULT 'active'::character varying NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    CONSTRAINT announcements_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'archived'::character varying])::text[])))
);


--
-- Name: announcements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.announcements_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: announcements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.announcements_id_seq OWNED BY public.announcements.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: feedback; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.feedback (
    id bigint NOT NULL,
    user_id bigint,
    opportunity_id character varying,
    name character varying,
    email character varying,
    message text NOT NULL,
    status character varying DEFAULT 'new'::character varying NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    CONSTRAINT feedback_status_check CHECK (((status)::text = ANY ((ARRAY['new'::character varying, 'reviewed'::character varying, 'resolved'::character varying, 'archived'::character varying])::text[])))
);


--
-- Name: feedback_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.feedback_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: feedback_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.feedback_id_seq OWNED BY public.feedback.id;


--
-- Name: missing_opportunity_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.missing_opportunity_submissions (
    id bigint NOT NULL,
    user_id bigint,
    title character varying NOT NULL,
    organization character varying,
    city character varying,
    region character varying,
    source_url character varying,
    contact_email character varying,
    notes text NOT NULL,
    status character varying DEFAULT 'new'::character varying NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    CONSTRAINT missing_opportunity_status_check CHECK (((status)::text = ANY ((ARRAY['new'::character varying, 'reviewing'::character varying, 'approved'::character varying, 'rejected'::character varying, 'duplicate'::character varying])::text[])))
);


--
-- Name: missing_opportunity_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.missing_opportunity_submissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: missing_opportunity_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.missing_opportunity_submissions_id_seq OWNED BY public.missing_opportunity_submissions.id;


--
-- Name: oauth_identities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.oauth_identities (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    provider character varying NOT NULL,
    uid character varying NOT NULL,
    email character varying,
    raw_info jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: oauth_identities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.oauth_identities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: oauth_identities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.oauth_identities_id_seq OWNED BY public.oauth_identities.id;


--
-- Name: opportunities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.opportunities (
    id character varying NOT NULL,
    organization_record_id bigint,
    title character varying NOT NULL,
    organization character varying NOT NULL,
    provider character varying,
    description text NOT NULL,
    summary text,
    opportunity_type character varying,
    category character varying NOT NULL,
    categories character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    community_focus character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    city character varying NOT NULL,
    region character varying NOT NULL,
    address character varying,
    latitude numeric(10,7),
    longitude numeric(10,7),
    virtual boolean DEFAULT false NOT NULL,
    start_date timestamp(6) without time zone,
    end_date timestamp(6) without time zone,
    deadline timestamp(6) without time zone,
    age_min integer DEFAULT 0 NOT NULL,
    age_max integer,
    grades character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    language character varying[] DEFAULT '{en}'::character varying[] NOT NULL,
    cost character varying DEFAULT 'Free to join'::character varying NOT NULL,
    source_url character varying NOT NULL,
    last_checked date,
    last_seen date,
    status character varying DEFAULT 'needs_review'::character varying NOT NULL,
    accessibility character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    equipment text,
    food text,
    capacity text,
    commitment text,
    registration_url character varying,
    provider_contact character varying,
    free_status_proof text,
    last_verified date,
    trusted_source boolean DEFAULT false NOT NULL,
    volunteer_hours_eligible boolean DEFAULT false NOT NULL,
    coop_eligible boolean DEFAULT false NOT NULL,
    paid_position boolean DEFAULT false NOT NULL,
    tags character varying[] DEFAULT '{}'::character varying[] NOT NULL,
    sources jsonb DEFAULT '[]'::jsonb NOT NULL,
    admin_audit_trail jsonb DEFAULT '[]'::jsonb NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    coordinates public.geography(Point,4326),
    CONSTRAINT opportunities_status_check CHECK (((status)::text = ANY ((ARRAY['active'::character varying, 'expired'::character varying, 'needs_review'::character varying, 'hidden'::character varying])::text[])))
);


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organizations (
    id bigint NOT NULL,
    name character varying NOT NULL,
    website_url character varying,
    contact_email character varying,
    trusted boolean DEFAULT false NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: organizations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.organizations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: organizations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;


--
-- Name: saved_opportunities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.saved_opportunities (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    opportunity_id character varying NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: saved_opportunities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.saved_opportunities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: saved_opportunities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.saved_opportunities_id_seq OWNED BY public.saved_opportunities.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: source_checks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.source_checks (
    id bigint NOT NULL,
    source_name character varying NOT NULL,
    source_url character varying NOT NULL,
    status character varying NOT NULL,
    checked_at timestamp(6) without time zone NOT NULL,
    result jsonb DEFAULT '{}'::jsonb NOT NULL,
    warning text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: source_checks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.source_checks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: source_checks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.source_checks_id_seq OWNED BY public.source_checks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    role character varying DEFAULT 'parent'::character varying NOT NULL,
    grade character varying,
    verified boolean DEFAULT false NOT NULL,
    api_token_digest character varying,
    deleted_at timestamp(6) without time zone,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['parent'::character varying, 'student'::character varying, 'admin'::character varying])::text[])))
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: announcements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements ALTER COLUMN id SET DEFAULT nextval('public.announcements_id_seq'::regclass);


--
-- Name: feedback id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedback ALTER COLUMN id SET DEFAULT nextval('public.feedback_id_seq'::regclass);


--
-- Name: missing_opportunity_submissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.missing_opportunity_submissions ALTER COLUMN id SET DEFAULT nextval('public.missing_opportunity_submissions_id_seq'::regclass);


--
-- Name: oauth_identities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_identities ALTER COLUMN id SET DEFAULT nextval('public.oauth_identities_id_seq'::regclass);


--
-- Name: organizations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);


--
-- Name: saved_opportunities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_opportunities ALTER COLUMN id SET DEFAULT nextval('public.saved_opportunities_id_seq'::regclass);


--
-- Name: source_checks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.source_checks ALTER COLUMN id SET DEFAULT nextval('public.source_checks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: feedback feedback_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT feedback_pkey PRIMARY KEY (id);


--
-- Name: missing_opportunity_submissions missing_opportunity_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.missing_opportunity_submissions
    ADD CONSTRAINT missing_opportunity_submissions_pkey PRIMARY KEY (id);


--
-- Name: oauth_identities oauth_identities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_identities
    ADD CONSTRAINT oauth_identities_pkey PRIMARY KEY (id);


--
-- Name: opportunities opportunities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunities
    ADD CONSTRAINT opportunities_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: saved_opportunities saved_opportunities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_opportunities
    ADD CONSTRAINT saved_opportunities_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: source_checks source_checks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.source_checks
    ADD CONSTRAINT source_checks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_announcements_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_announcements_on_status ON public.announcements USING btree (status);


--
-- Name: index_feedback_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_feedback_on_status ON public.feedback USING btree (status);


--
-- Name: index_feedback_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_feedback_on_user_id ON public.feedback USING btree (user_id);


--
-- Name: index_missing_opportunity_submissions_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_missing_opportunity_submissions_on_status ON public.missing_opportunity_submissions USING btree (status);


--
-- Name: index_missing_opportunity_submissions_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_missing_opportunity_submissions_on_user_id ON public.missing_opportunity_submissions USING btree (user_id);


--
-- Name: index_oauth_identities_on_provider_and_uid; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_oauth_identities_on_provider_and_uid ON public.oauth_identities USING btree (provider, uid);


--
-- Name: index_oauth_identities_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_oauth_identities_on_user_id ON public.oauth_identities USING btree (user_id);


--
-- Name: index_opportunities_on_categories; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_categories ON public.opportunities USING gin (categories);


--
-- Name: index_opportunities_on_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_category ON public.opportunities USING btree (category);


--
-- Name: index_opportunities_on_city; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_city ON public.opportunities USING btree (city);


--
-- Name: index_opportunities_on_community_focus; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_community_focus ON public.opportunities USING gin (community_focus);


--
-- Name: index_opportunities_on_coordinates; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_coordinates ON public.opportunities USING gist (coordinates);


--
-- Name: index_opportunities_on_deadline; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_deadline ON public.opportunities USING btree (deadline);


--
-- Name: index_opportunities_on_end_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_end_date ON public.opportunities USING btree (end_date);


--
-- Name: index_opportunities_on_language; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_language ON public.opportunities USING gin (language);


--
-- Name: index_opportunities_on_organization_record_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_organization_record_id ON public.opportunities USING btree (organization_record_id);


--
-- Name: index_opportunities_on_organization_trgm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_organization_trgm ON public.opportunities USING gin (organization public.gin_trgm_ops);


--
-- Name: index_opportunities_on_region; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_region ON public.opportunities USING btree (region);


--
-- Name: index_opportunities_on_source_url; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_source_url ON public.opportunities USING btree (source_url);


--
-- Name: index_opportunities_on_start_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_start_date ON public.opportunities USING btree (start_date);


--
-- Name: index_opportunities_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_status ON public.opportunities USING btree (status);


--
-- Name: index_opportunities_on_tags; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_tags ON public.opportunities USING gin (tags);


--
-- Name: index_opportunities_on_title_trgm; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_opportunities_on_title_trgm ON public.opportunities USING gin (title public.gin_trgm_ops);


--
-- Name: index_organizations_on_lower_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_organizations_on_lower_name ON public.organizations USING btree (lower((name)::text));


--
-- Name: index_saved_opportunities_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_saved_opportunities_on_user_id ON public.saved_opportunities USING btree (user_id);


--
-- Name: index_saved_opportunities_on_user_id_and_opportunity_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_saved_opportunities_on_user_id_and_opportunity_id ON public.saved_opportunities USING btree (user_id, opportunity_id);


--
-- Name: index_source_checks_on_checked_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_source_checks_on_checked_at ON public.source_checks USING btree (checked_at);


--
-- Name: index_source_checks_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_source_checks_on_status ON public.source_checks USING btree (status);


--
-- Name: index_users_on_api_token_digest; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_api_token_digest ON public.users USING btree (api_token_digest) WHERE (api_token_digest IS NOT NULL);


--
-- Name: index_users_on_lower_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_users_on_lower_email ON public.users USING btree (lower((email)::text));


--
-- Name: missing_opportunity_submissions fk_rails_2c40a13173; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.missing_opportunity_submissions
    ADD CONSTRAINT fk_rails_2c40a13173 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: oauth_identities fk_rails_2f75762ff1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_identities
    ADD CONSTRAINT fk_rails_2f75762ff1 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: feedback fk_rails_3ffcea2ae3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT fk_rails_3ffcea2ae3 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: saved_opportunities fk_rails_62a7559db6; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_opportunities
    ADD CONSTRAINT fk_rails_62a7559db6 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: feedback fk_rails_7c4742c420; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedback
    ADD CONSTRAINT fk_rails_7c4742c420 FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(id);


--
-- Name: opportunities fk_rails_7ff00cef44; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.opportunities
    ADD CONSTRAINT fk_rails_7ff00cef44 FOREIGN KEY (organization_record_id) REFERENCES public.organizations(id);


--
-- Name: saved_opportunities fk_rails_9e4cddda53; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.saved_opportunities
    ADD CONSTRAINT fk_rails_9e4cddda53 FOREIGN KEY (opportunity_id) REFERENCES public.opportunities(id);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO "schema_migrations" (version) VALUES
('20260612120000');

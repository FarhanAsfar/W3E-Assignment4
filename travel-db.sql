--
-- PostgreSQL database dump
--

\restrict 7BeXG3YllDZimp4YdbQQwHch5odB6eYKsrS4DkgmLgfw9SEuKyUGiwP6eZCVRmW

-- Dumped from database version 17.6 (Debian 17.6-1.pgdg13+1)
-- Dumped by pg_dump version 17.6 (Debian 17.6-1.pgdg13+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Airport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Airport" (
    id integer NOT NULL,
    "airportId" text NOT NULL,
    "locationId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "airportName" text NOT NULL
);


ALTER TABLE public."Airport" OWNER TO postgres;

--
-- Name: Airport_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Airport_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Airport_id_seq" OWNER TO postgres;

--
-- Name: Airport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Airport_id_seq" OWNED BY public."Airport".id;


--
-- Name: Attraction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Attraction" (
    id integer NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    description text,
    "locationId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Attraction" OWNER TO postgres;

--
-- Name: Attraction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Attraction_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Attraction_id_seq" OWNER TO postgres;

--
-- Name: Attraction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Attraction_id_seq" OWNED BY public."Attraction".id;


--
-- Name: Flight; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Flight" (
    id integer NOT NULL,
    "flightName" text NOT NULL,
    "flightNumber" text NOT NULL,
    "airlineName" text NOT NULL,
    "departureAirportId" integer NOT NULL,
    "arrivalAirportId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Flight" OWNER TO postgres;

--
-- Name: Flight_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Flight_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Flight_id_seq" OWNER TO postgres;

--
-- Name: Flight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Flight_id_seq" OWNED BY public."Flight".id;


--
-- Name: Location; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Location" (
    id integer NOT NULL,
    city text,
    "cityName" text NOT NULL,
    country text,
    "countryName" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Location" OWNER TO postgres;

--
-- Name: Location_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Location_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Location_id_seq" OWNER TO postgres;

--
-- Name: Location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Location_id_seq" OWNED BY public."Location".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Airport id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Airport" ALTER COLUMN id SET DEFAULT nextval('public."Airport_id_seq"'::regclass);


--
-- Name: Attraction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attraction" ALTER COLUMN id SET DEFAULT nextval('public."Attraction_id_seq"'::regclass);


--
-- Name: Flight id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Flight" ALTER COLUMN id SET DEFAULT nextval('public."Flight_id_seq"'::regclass);


--
-- Name: Location id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location" ALTER COLUMN id SET DEFAULT nextval('public."Location_id_seq"'::regclass);


--
-- Data for Name: Airport; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Airport" (id, "airportId", "locationId", "createdAt", "updatedAt", "airportName") FROM stdin;
1	DEL.AIRPORT	2	2026-01-13 11:08:26.313	2026-01-13 11:08:26.313	Delhi International Airport
2	AKL.AIRPORT	3	2026-01-13 11:08:26.334	2026-01-13 11:08:26.334	Auckland Airport
3	JFK.AIRPORT	4	2026-01-13 11:08:26.355	2026-01-13 11:08:26.355	John F. Kennedy International Airport
4	EWR.AIRPORT	5	2026-01-13 11:08:26.375	2026-01-13 11:08:26.375	Newark Liberty International Airport
5	LGA.AIRPORT	6	2026-01-13 11:08:26.398	2026-01-13 11:08:26.398	LaGuardia Airport
6	SYD.AIRPORT	7	2026-01-13 11:08:26.42	2026-01-13 11:08:26.42	Sydney Kingsford Smith Airport
7	CTS.AIRPORT	8	2026-01-13 11:08:26.442	2026-01-13 11:08:26.442	New Chitose Airport
8	AEP.AIRPORT	9	2026-01-13 11:08:26.463	2026-01-13 11:08:26.463	Jorge Newbery Airfield
9	NCL.AIRPORT	10	2026-01-13 11:08:26.487	2026-01-13 11:08:26.487	Newcastle International Airport
10	CHC.AIRPORT	11	2026-01-13 11:08:26.513	2026-01-13 11:08:26.513	Christchurch International Airport
11	BOM	1	2026-01-13 11:26:35.122	2026-01-13 11:26:35.122	Chhatrapati Shivaji International Airport Mumbai
12	DEL	2	2026-01-13 11:26:35.141	2026-01-13 11:26:35.141	Delhi International Airport
\.


--
-- Data for Name: Attraction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Attraction" (id, address, city, country, description, "locationId", "createdAt", "updatedAt") FROM stdin;
1	Churchgate or Mahim	Mumbai Maharashtra	in	On this two-hour group tour, you'll discover Dharavi, one of Mumbai's slums with a local guide. During the tour, you'll see small-scale industries where recycled clothing and goods are made, visit a bakery, residential areas, schools, and the pottery manufacturing area.	3	2026-01-13 12:04:58.431	2026-01-13 12:04:58.431
2	Churchgate or Mahim	Mumbai	IN	A guided tour of Dharavi exploring local industries, residential areas, schools, and recycling units with a knowledgeable local guide.	1	2026-01-13 12:15:05.498	2026-01-13 12:15:05.498
3	Connaught Place	New Delhi	IN	A cultural walking tour covering historical landmarks, markets, and street food hotspots in central New Delhi.	2	2026-01-13 12:15:05.498	2026-01-13 12:15:05.498
4	Sky Tower, Victoria Street	Auckland	NZ	Experience panoramic city views from the Sky Tower and explore Auckland’s vibrant waterfront and downtown area.	3	2026-01-13 12:15:05.498	2026-01-13 12:15:05.498
5	Times Square	New York	US	A guided sightseeing experience covering Times Square, Broadway, and nearby iconic Manhattan landmarks.	4	2026-01-13 12:15:05.498	2026-01-13 12:15:05.498
6	Statue of Liberty Ferry Terminal	New York	US	A ferry-based tour to the Statue of Liberty and Ellis Island with historical commentary and museum access.	5	2026-01-13 12:15:05.498	2026-01-13 12:15:05.498
7	Sydney Opera House	Sydney	AU	A guided tour of the Sydney Opera House highlighting its architecture, history, and cultural significance.	7	2026-01-13 12:15:05.498	2026-01-13 12:15:05.498
8	Odori Park	Sapporo	JP	Seasonal city tour featuring Odori Park, local cuisine, and cultural attractions in the heart of Sapporo.	8	2026-01-13 12:15:05.498	2026-01-13 12:15:05.498
\.


--
-- Data for Name: Flight; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Flight" (id, "flightName", "flightNumber", "airlineName", "departureAirportId", "arrivalAirportId", "createdAt", "updatedAt") FROM stdin;
1	BOM → DEL	2156	IndiGo	11	12	2026-01-13 11:26:35.149	2026-01-13 11:26:35.149
3	BOM → JFK	6E2156	IndiGo	11	3	2026-01-13 11:39:26.597	2026-01-13 11:39:26.597
4	DEL → BOM	AI441	Air India	2	1	2026-01-13 11:39:26.597	2026-01-13 11:39:26.597
5	JFK → EWR	UA102	United Airlines	3	4	2026-01-13 11:39:26.597	2026-01-13 11:39:26.597
6	EWR → JFK	AA331	American Airlines	4	3	2026-01-13 11:39:26.597	2026-01-13 11:39:26.597
7	SYD → BOM	QF63	Qantas	5	1	2026-01-13 11:39:26.597	2026-01-13 11:39:26.597
\.


--
-- Data for Name: Location; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Location" (id, city, "cityName", country, "countryName", "createdAt", "updatedAt") FROM stdin;
1	BOM	Mumbai	IN	India	2026-01-13 05:39:53.613	2026-01-13 05:39:53.613
2	DEL	New Delhi	IN	India	2026-01-13 11:08:26.274	2026-01-13 11:08:26.274
3	AKL	Auckland	NZ	New Zealand	2026-01-13 11:08:26.323	2026-01-13 11:08:26.323
4	JFK	New York	US	United States	2026-01-13 11:08:26.344	2026-01-13 11:08:26.344
5	EWR	New York	US	United States	2026-01-13 11:08:26.364	2026-01-13 11:08:26.364
6	LGA	New York	US	United States	2026-01-13 11:08:26.385	2026-01-13 11:08:26.385
7	SYD	Sydney	AU	Australia	2026-01-13 11:08:26.408	2026-01-13 11:08:26.408
8	CTS	Sapporo	JP	Japan	2026-01-13 11:08:26.43	2026-01-13 11:08:26.43
9	AEP	Buenos Aires	AR	Argentina	2026-01-13 11:08:26.451	2026-01-13 11:08:26.451
10	NCL	Newcastle upon Tyne	GB	United Kingdom	2026-01-13 11:08:26.473	2026-01-13 11:08:26.473
11	CHC	Christchurch	NZ	New Zealand	2026-01-13 11:08:26.497	2026-01-13 11:08:26.497
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
ec4817ad-751d-4601-92e3-547881d35544	a6212c229f4e79cad4ba0d2863ee024ca3ff53272f6b09efb12c49fb9f2d1824	2026-01-13 04:19:55.16741+00	0_init		\N	2026-01-13 04:19:55.16741+00	0
fd70e87e-03fc-4bc3-98f3-97fff099b89e	8d26175575881c14277d6daa8c0b34c74045ca2986cb9aaa644e4ce068fbe4cd	2026-01-13 05:27:40.210383+00	20260113052740_init	\N	\N	2026-01-13 05:27:40.187288+00	1
98e6019d-2b52-4d67-9672-a3e62d151441	b9e14ed9c8e0effa644a967731a9d7915c85743181527ee908fc674e2113751b	2026-01-13 07:38:51.160039+00	20260113073851_update_flight_model	\N	\N	2026-01-13 07:38:51.140458+00	1
98c7a13f-6bfa-48cc-9c69-9de99153333f	28a8be873559a4ba715ca1b43f5bd5678fc8e647aa0809e0c15235d772ad5e76	2026-01-13 08:57:09.103852+00	20260113085709_update_schema	\N	\N	2026-01-13 08:57:09.08454+00	1
e337a1af-c745-4d29-99fe-78f6a52e235e	5c3493cb5f7b93723a57595935ed9646d35fa85579cb177302171083dfcc2f62	2026-01-13 11:01:38.548593+00	20260113110138_type_fix	\N	\N	2026-01-13 11:01:38.5291+00	1
fbc5ae34-5422-48e9-b253-cf66e5813fbb	f739e4a36f9c80ea458a466675b75417e7b6ac6338958c59948b1d95c141b136	2026-01-13 11:06:03.01587+00	20260113110602_unique	\N	\N	2026-01-13 11:06:02.989079+00	1
\.


--
-- Name: Airport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Airport_id_seq"', 12, true);


--
-- Name: Attraction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Attraction_id_seq"', 8, true);


--
-- Name: Flight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Flight_id_seq"', 7, true);


--
-- Name: Location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Location_id_seq"', 11, true);


--
-- Name: Airport Airport_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Airport"
    ADD CONSTRAINT "Airport_pkey" PRIMARY KEY (id);


--
-- Name: Attraction Attraction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attraction"
    ADD CONSTRAINT "Attraction_pkey" PRIMARY KEY (id);


--
-- Name: Flight Flight_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Flight"
    ADD CONSTRAINT "Flight_pkey" PRIMARY KEY (id);


--
-- Name: Location Location_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Location"
    ADD CONSTRAINT "Location_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Airport_airportId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Airport_airportId_key" ON public."Airport" USING btree ("airportId");


--
-- Name: Location_city_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Location_city_key" ON public."Location" USING btree (city);


--
-- Name: Airport Airport_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Airport"
    ADD CONSTRAINT "Airport_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Attraction Attraction_locationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Attraction"
    ADD CONSTRAINT "Attraction_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public."Location"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Flight Flight_arrivalAirportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Flight"
    ADD CONSTRAINT "Flight_arrivalAirportId_fkey" FOREIGN KEY ("arrivalAirportId") REFERENCES public."Airport"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Flight Flight_departureAirportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Flight"
    ADD CONSTRAINT "Flight_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES public."Airport"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict 7BeXG3YllDZimp4YdbQQwHch5odB6eYKsrS4DkgmLgfw9SEuKyUGiwP6eZCVRmW


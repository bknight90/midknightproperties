"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { CalendarDays, Compass, Copy, Download, Expand, Image as ImageIcon, LockKeyhole, MapPin, Menu, Sofa, Sun, Utensils } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Contact placeholders requested by the owner. No live booking destination is connected.
const contactDetails = [
  { label: "Email enquiries", value: "[Your email address]" },
  { label: "Telephone", value: "[Your phone number]" },
  { label: "Book your stay", value: "[Your booking link]" },
];

const photos = [
  { file: "apartment-living", title: "Space to settle in.", caption: "Soft light. Warm textures. Your own little sanctuary.", alt: "Light-filled open-plan living and dining area with a cream sofa, television, wood dining table and kitchen cabinetry.", width: 2048, height: 1219 },
  { file: "dining-detail", title: "Time to linger.", caption: "A beautifully set table. An evening with no rush.", alt: "Dining table set with white crockery, wine glasses, a dark green runner and gold candleholders.", width: 2048, height: 1362 },
];
const cityPlaces = [
  { id: "old-town", title: "A little history", place: "Southampton Old Town", text: "Wander medieval walls and ancient gateways, discover Tudor House, then find a table at one of the Old Town’s independent restaurants.", link: "https://www.visitsouthampton.co.uk/explore/places/old-town/", linkLabel: "Explore the Old Town" },
  { id: "ocean-village", title: "A moment by the water", place: "Ocean Village", text: "Take in the marina at Ocean Village. Waterfront restaurants, bars and a cinema make it a lovely setting for an unhurried afternoon or evening.", link: "https://www.mdlmarinas.co.uk/marinas/mdl-ocean-village-marina/", linkLabel: "Discover Ocean Village" },
  { id: "seacity", title: "A story of the sea", place: "SeaCity Museum", text: "Discover Southampton’s maritime heritage and its connection to Titanic, brought to life through personal stories, objects and interactive displays.", link: "https://seacitymuseum.co.uk/exhibitions/southamptons-titanic-story/", linkLabel: "Visit SeaCity Museum" },
];
const faqs = [
  { question: "How do I enquire about a stay?", answer: "Use ‘Plan your stay’ to choose your preferred dates and number of guests. You can then prepare, copy or download an enquiry to share with your host. The host will confirm rates and availability before you book." },
  { question: "Can I enquire about a longer stay?", answer: "Of course. Include your preferred dates and any particular requirements in your enquiry. Your host can confirm whether the apartment is available for the length of stay you have in mind." },
  { question: "Where is the apartment located?", answer: "The apartment is in Southampton, England. Request the full address and arrival information from your host when arranging your stay. Our city guide offers ideas for exploring Southampton; it does not indicate distances from the apartment." },
  { question: "Does an enquiry reserve my dates?", answer: "An enquiry is the first step, rather than a confirmed reservation. Your dates, the accommodation rate and all booking arrangements must be agreed with your host before your stay is confirmed." },
];
type Stay = { arrival: string; departure: string; guests: string; name: string; email: string; message: string };
const initialStay: Stay = { arrival: "", departure: "", guests: "2", name: "", email: "", message: "" };
function todayInSouthampton() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date());
  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}
function nextDay(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
  const date = new Date(`${value}T12:00:00Z`); date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().slice(0, 10);
}
function formatDate(value: string, long = false) {
  if (!value) return "To be arranged";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: long ? "long" : "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
}
function nightCount(stay: Stay) { return Math.round((Date.parse(stay.departure) - Date.parse(stay.arrival)) / 86400000); }
function enquiryText(stay: Stay) {
  return ["MIDKNIGHT PROPERTIES — SOUTHAMPTON", "Stay enquiry", "", `Arrival: ${formatDate(stay.arrival, true)}`, `Departure: ${formatDate(stay.departure, true)}`, `Nights: ${nightCount(stay)}`, `Guests requested: ${stay.guests}`, ...(stay.name ? [`Name: ${stay.name}`] : []), ...(stay.email ? [`Email: ${stay.email}`] : []), ...(stay.message ? ["", "Additional details:", stay.message] : []), "", "Please confirm availability, rates and booking arrangements for this stay.", "This is an enquiry, not a confirmed reservation."].join("\n");
}
function Brand({ footer = false }: { footer?: boolean }) {
  return <a className="brand" href="#top" aria-label="MidKnight Properties — back to top"><img className="brand-icon" src="/images/midknight-mark.svg" alt="" width="48" height="48" /><span className="brand-type"><span className="brand-name">MIDKNIGHT</span><span className="brand-sub">Properties{footer ? " · Southampton" : ""}</span></span></a>;
}
function ApartmentPhoto({ index, className = "", priority = false }: { index: number; className?: string; priority?: boolean }) {
  const photo = photos[index];
  return <img src={`/images/${photo.file}-1600.webp`} srcSet={[640, 960, 1600, 2048].map((size) => `/images/${photo.file}-${size}.webp ${size}w`).join(", ")} sizes={priority ? "100vw" : "(max-width: 420px) 90vw, (max-width: 760px) 50vw, 60vw"} alt={photo.alt} width={photo.width} height={photo.height} className={className} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" />;
}
function GuestSelect({ value, onChange, id, className = "" }: { value: string; onChange: (value: string) => void; id: string; className?: string }) {
  return <Select value={value} onValueChange={onChange}><SelectTrigger id={id} className={className} aria-label="Number of guests requested"><SelectValue /></SelectTrigger><SelectContent>{["1", "2", "3", "4", "5", "6+"].map((number) => <SelectItem key={number} value={number}>{number} {number === "1" ? "guest" : "guests"}</SelectItem>)}</SelectContent></Select>;
}

export default function Home() {
  const [stay, setStay] = useState<Stay>(initialStay);
  const [today, setToday] = useState("");
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [manualCopy, setManualCopy] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [showMobileStay, setShowMobileStay] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  useEffect(() => {
    type BrowserTool = { name: string; title: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }; execute: (input: unknown) => unknown };
    const context = (document as Document & { modelContext?: { registerTool: (tool: BrowserTool, options: { signal: AbortSignal }) => void | Promise<void> } }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const tool: BrowserTool = {
      name: "stage_stay_enquiry", title: "Prepare stay enquiry details",
      description: "Fill the visible MidKnight stay planner with preferred dates and party size. This opens a draft for review; it never sends an enquiry, checks availability, or reserves accommodation.",
      inputSchema: { type: "object", properties: { arrival: { type: "string", description: "Arrival in YYYY-MM-DD format" }, departure: { type: "string", description: "Departure in YYYY-MM-DD format" }, guests: { type: "string", enum: ["1", "2", "3", "4", "5", "6+"] } }, required: ["arrival", "departure", "guests"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) {
        if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Provide arrival, departure and guests.");
        const values = input as Record<string, unknown>;
        if (Object.keys(values).some((key) => !["arrival", "departure", "guests"].includes(key))) throw new Error("Only arrival, departure and guests are accepted.");
        const validDate = (value: unknown): value is string => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T12:00:00Z`)) && new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value;
        if (!validDate(values.arrival) || !validDate(values.departure)) throw new Error("Use valid calendar dates in YYYY-MM-DD format.");
        if (values.arrival < todayInSouthampton() || values.departure <= values.arrival) throw new Error("Arrival must be today or later, and departure must follow arrival.");
        if (typeof values.guests !== "string" || !["1", "2", "3", "4", "5", "6+"].includes(values.guests)) throw new Error("Choose a supported party size.");
        const selected = { arrival: values.arrival, departure: values.departure, guests: values.guests };
        flushSync(() => { setStay((current) => ({ ...current, ...selected })); setMenuOpen(false); setEnquiryOpen(true); setReviewing(false); setError(""); setFeedback(""); setManualCopy(false); });
        return { status: "draft_staged", ...selected, nights: nightCount({ ...initialStay, ...selected }), sent: false, reserved: false };
      },
    };
    try { void Promise.resolve(context.registerTool(tool, { signal: lifecycle.signal })).catch(() => {}); } catch { /* The visible stay planner remains available. */ }
    return () => lifecycle.abort();
  }, []);
  useEffect(() => {
    setToday(todayInSouthampton());
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let scrollFrame = 0;
    const updateScroll = () => {
      const maxScroll = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--page-progress", String(maxScroll > 0 ? window.scrollY / maxScroll : 0));
      root.style.setProperty("--hero-shift", reduceMotion.matches || window.innerWidth < 761 ? "0px" : `${Math.min(window.scrollY * .13, 65)}px`);
      setShowMobileStay(window.scrollY > 760 && window.scrollY + window.innerHeight < root.scrollHeight - 220);
      scrollFrame = 0;
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
    window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll, { passive: true }); reduceMotion.addEventListener("change", onScroll); updateScroll();
    const revealObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); revealObserver.unobserve(entry.target); } }); }, { threshold: .08, rootMargin: "0px 0px -30px 0px" });
    if (!reduceMotion.matches) root.classList.add("motion-ready");
    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    const sectionObserver = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }); }, { rootMargin: "-15% 0px -60% 0px" });
    ["apartment", "gallery", "southampton"].forEach((id) => { const section = document.getElementById(id); if (section) sectionObserver.observe(section); });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); reduceMotion.removeEventListener("change", onScroll); cancelAnimationFrame(scrollFrame); revealObserver.disconnect(); sectionObserver.disconnect(); root.classList.remove("motion-ready"); };
  }, []);
  useEffect(() => {
    if (!galleryOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); setPhotoIndex((current) => (current + 1) % photos.length); } };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [galleryOpen]);
  function updateStay(field: keyof Stay, value: string) { setStay((current) => ({ ...current, [field]: value, ...(field === "arrival" && current.departure && current.departure <= value ? { departure: "" } : {}) })); setError(""); setFeedback(""); }
  function openEnquiry() { setMenuOpen(false); setEnquiryOpen(true); setReviewing(false); setError(""); setFeedback(""); setManualCopy(false); }
  function openGallery(index = 0) { setPhotoIndex(index); setGalleryOpen(true); }
  function prepareEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!stay.arrival || !stay.departure) { setError("Please choose an arrival and departure date."); return; }
    if (stay.arrival < todayInSouthampton()) { setError("Please choose an arrival date that is today or later."); return; }
    if (stay.departure <= stay.arrival) { setError("Your departure date needs to be after your arrival."); return; }
    setError(""); setReviewing(true); setFeedback("");
  }
  async function copyEnquiry() { try { await navigator.clipboard.writeText(enquiryText(stay)); setFeedback("Enquiry copied. It is ready to share with your host."); setManualCopy(false); } catch { setManualCopy(true); setFeedback("Select and copy your enquiry below."); } }
  function downloadEnquiry() { const blob = new Blob([enquiryText(stay)], { type: "text/plain;charset=utf-8" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `midknight-stay-enquiry-${stay.arrival}.txt`; document.body.appendChild(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); setFeedback("Your enquiry download is ready. Share it with your host when you’re ready."); }

  return <>
    <a className="skip-link" href="#main">Skip to content</a><div id="top" />
    <header className="site-header"><div className="shell header-inner"><Brand /><nav className="desktop-nav" aria-label="Main navigation">{[["apartment", "The apartment"], ["gallery", "The gallery"], ["southampton", "Southampton"]].map(([id, label]) => <a key={id} href={`#${id}`} className="nav-link" aria-current={activeSection === id ? "location" : undefined}>{label}</a>)}</nav><button className="button button-green header-cta" onClick={openEnquiry}>Plan your stay</button><button className="mobile-menu-button" aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu size={19} strokeWidth={1.4} /></button></div><div className="header-progress" aria-hidden="true" /></header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-heading"><div className="hero-image-wrap"><ApartmentPhoto index={0} priority className="hero-image" /></div><div className="hero-shade" /><div className="shell hero-shell"><div className="hero-copy"><p className="eyebrow eyebrow-light hero-eyebrow">A MIDKNIGHT STAY · SOUTHAMPTON</p><h1 id="hero-heading"><span><span>A slower pace.</span></span><span><span><em>A finer stay.</em></span></span></h1><p className="hero-description">Your own space. A little more comfort.<br />A beautifully considered stay in Southampton.</p><div className="hero-actions"><a className="button button-cream" href="#apartment">Discover the apartment</a><button className="text-link" onClick={() => openGallery(0)}>View the gallery</button></div></div><button className="hero-photo-button" onClick={() => openGallery(0)} aria-label="Explore both apartment photographs"><ImageIcon aria-hidden="true" /><span>EXPLORE</span></button><div className="hero-bottom"><p className="hero-location"><MapPin aria-hidden="true" />Southampton, England</p><span className="hero-image-label"><span className="hairline" />A place to feel at home<span>01 / 02</span></span></div></div></section>
      <section className="stay-strip" aria-label="Plan a stay"><div className="shell"><form className="stay-form" onSubmit={(event) => { event.preventDefault(); openEnquiry(); }}><div className="stay-intro"><span className="small-label">Make time for yourself</span><p>Your stay starts here.</p></div><div className="date-field"><label htmlFor="quick-arrival">Arrival</label><input id="quick-arrival" className="strip-input" type="date" value={stay.arrival} min={today} onChange={(event) => updateStay("arrival", event.target.value)} aria-label="Preferred arrival date" /></div><div className="date-field"><label htmlFor="quick-departure">Departure</label><input id="quick-departure" className="strip-input" type="date" value={stay.departure} min={nextDay(stay.arrival || today)} onChange={(event) => updateStay("departure", event.target.value)} aria-label="Preferred departure date" /></div><div className="guest-field"><label htmlFor="quick-guests">Guests</label><GuestSelect id="quick-guests" value={stay.guests} onChange={(value) => updateStay("guests", value)} className="strip-select" /></div><button type="submit" className="button button-cream stay-button">Plan your stay</button></form><p className="strip-caption">A personal enquiry. Availability and rates confirmed by your host.</p></div></section>
      <section id="apartment" className="apartment-section shell" aria-labelledby="apartment-heading"><div className="intro-grid"><div className="reveal"><p className="eyebrow">The apartment</p><h2 id="apartment-heading" className="section-heading">Some places just<br /><em>feel different.</em></h2></div><div className="intro-copy reveal" style={{ "--reveal-delay": "100ms" } as CSSProperties}><p>Soft morning light. Natural textures. Space to make yourself at home. Discover a thoughtfully styled Southampton apartment, with a welcoming living area and room to come together.</p><p style={{ marginTop: 14 }}>For the days out, the evenings in, and the moments in between.</p><button className="text-link" onClick={() => openGallery(0)}>Take a closer look</button></div></div><div id="gallery" className="gallery-grid" aria-label="Apartment photo gallery">{photos.map((photo, index) => <figure key={photo.file} className="gallery-card reveal" style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}><button className="gallery-image-button" onClick={() => openGallery(index)} aria-label={`View full photograph: ${photo.title}`}><picture><ApartmentPhoto index={index} className="gallery-photo" /></picture><span className="image-expand" aria-hidden="true"><Expand /></span></button><figcaption className="image-caption"><div><h3>{photo.title}</h3><p>{photo.caption}</p></div><span>0{index + 1}</span></figcaption>{index === 1 && <p className="gallery-note">The pleasure of having<br />nowhere else to be.</p>}</figure>)}</div><div className="details-row"><div className="detail reveal"><Sofa aria-hidden="true" /><div><h3>Room to unwind</h3><p>A welcoming living area, soft seating and a slower rhythm.</p></div></div><div className="detail reveal" style={{ "--reveal-delay": "100ms" } as CSSProperties}><Utensils aria-hidden="true" /><div><h3>Space to come together</h3><p>A dedicated dining space for morning coffee and evenings in.</p></div></div><div className="detail reveal" style={{ "--reveal-delay": "200ms" } as CSSProperties}><Sun aria-hidden="true" /><div><h3>Considered details</h3><p>Warm tones, natural light and interiors that feel like home.</p></div></div></div></section>
      <section id="southampton" className="city-section" aria-labelledby="city-heading"><div className="shell city-layout"><div className="city-copy reveal"><p className="eyebrow">The Southampton notebook</p><h2 className="section-heading" id="city-heading">A city to explore.<br /><em>A place to return.</em></h2><p>Waterside moments, old streets and new discoveries. Find your own pace in Southampton.</p><div className="city-coordinates"><Compass aria-hidden="true" /><p>SOUTHAMPTON<span>Hampshire · England</span></p></div></div><div className="reveal" style={{ "--reveal-delay": "100ms" } as CSSProperties}><Accordion type="single" collapsible defaultValue="old-town" className="city-list">{cityPlaces.map((place, index) => <AccordionItem className="city-item" key={place.id} value={place.id}><AccordionTrigger className="city-trigger"><span className="city-item-title"><span className="city-item-number">0{index + 1}</span><strong>{place.title}</strong></span></AccordionTrigger><AccordionContent className="city-content"><p><span style={{ color: "#e6dfca", display: "block", marginBottom: 7 }}>{place.place}</span>{place.text}</p><a className="text-link" href={place.link} target="_blank" rel="noopener noreferrer">{place.linkLabel}<span className="sr-only"> (opens official guide in a new tab)</span></a></AccordionContent></AccordionItem>)}</Accordion><p className="city-note">A few places to discover around the city. Follow the official guides for visitor information.</p></div></div></section>
      <section id="questions" className="faq-section shell" aria-labelledby="faq-heading"><div className="faq-layout"><div className="faq-heading reveal"><p className="eyebrow">A few good questions</p><h2 className="section-heading" id="faq-heading">Before you<br /><em>settle in.</em></h2><p>A little clarity for the start of a lovely stay.</p></div><Accordion type="single" collapsible className="faq-list reveal">{faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger className="faq-trigger"><span>{faq.question}</span></AccordionTrigger><AccordionContent className="faq-content">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section className="closing-section shell" aria-labelledby="closing-heading"><div className="closing-box reveal"><img src="/images/midknight-mark.svg" className="closing-mark" alt="" width="350" height="350" loading="lazy" /><div className="closing-copy"><p className="eyebrow">Make it a MidKnight stay</p><h2 id="closing-heading">A change of scene.<br /><em>A space of your own.</em></h2></div><div className="closing-action"><button className="button button-green" onClick={openEnquiry}>Plan your stay</button><p>Your Southampton story starts here.</p></div></div></section>
    </main>
    <footer className="site-footer shell"><div className="footer-top"><Brand footer /><p className="footer-tagline">Stay a little differently.</p></div><div className="footer-contact-grid" aria-label="Contact details to be added">{contactDetails.map((detail) => <div key={detail.label}><p>{detail.label}</p><span>{detail.value}</span></div>)}</div><div className="footer-bottom"><p>© 2026 MidKnight Properties. All rights reserved.</p><div className="footer-links"><button onClick={() => setPrivacyOpen(true)}>Privacy</button><a href="#questions">Guest questions</a><a href="#top">Back to top</a></div></div></footer>
    <div className={`mobile-stay ${showMobileStay ? "is-shown" : ""}`} aria-hidden={!showMobileStay}><p>Your space awaits.<span>Southampton · England</span></p><button className="button button-green" onClick={openEnquiry} tabIndex={showMobileStay ? 0 : -1}>Plan your stay</button></div>
    <Dialog open={enquiryOpen} onOpenChange={setEnquiryOpen}><DialogContent className="stay-dialog"><div className="enquiry-scroll"><div className="enquiry-heading"><p className="eyebrow">Your MidKnight stay</p><DialogTitle>{reviewing ? "A little closer to your stay." : "Make yourself at home."}</DialogTitle><DialogDescription>{reviewing ? "Your enquiry is ready to share. Copy or download your details and send them to your host." : "Choose your preferred dates and prepare a personal enquiry to share with your host."}</DialogDescription></div>{!reviewing ? <form className="enquiry-form" onSubmit={prepareEnquiry}><div className="form-grid"><label className="form-field"><span>Arrival</span><input autoComplete="off" type="date" value={stay.arrival} required min={today} onChange={(event) => updateStay("arrival", event.target.value)} /></label><label className="form-field"><span>Departure</span><input autoComplete="off" type="date" value={stay.departure} required min={nextDay(stay.arrival || today)} onChange={(event) => updateStay("departure", event.target.value)} /></label><div className="form-field"><label htmlFor="enquiry-guests">Guests requested</label><GuestSelect id="enquiry-guests" value={stay.guests} onChange={(value) => updateStay("guests", value)} /></div><label className="form-field"><span>Your name<span className="form-optional">optional</span></span><input autoComplete="name" maxLength={100} value={stay.name} onChange={(event) => updateStay("name", event.target.value)} placeholder="Full name" /></label><label className="form-field form-full"><span>Your email<span className="form-optional">optional</span></span><input autoComplete="email" type="email" maxLength={254} value={stay.email} onChange={(event) => updateStay("email", event.target.value)} placeholder="you@example.com" /></label><label className="form-field form-full"><span>Anything you’d like us to know?<span className="form-optional">optional</span></span><textarea value={stay.message} maxLength={1500} onChange={(event) => updateStay("message", event.target.value)} placeholder="Tell your host a little about your visit or any particular requirements." rows={3} /></label></div><p className="form-helper">Your host will confirm availability, guest capacity and rates.</p>{error && <p className="form-error" role="alert">{error}</p>}<button type="submit" className="button button-green form-submit">Prepare enquiry</button><p className="form-notice"><LockKeyhole aria-hidden="true" /><span>Your details stay in this page. Preparing an enquiry does not send a message or reserve dates.</span></p></form> : <div><div className="review-summary"><p className="summary-dates">{formatDate(stay.arrival)} – {formatDate(stay.departure)}</p><p className="summary-meta">{nightCount(stay)} {nightCount(stay) === 1 ? "night" : "nights"} · {stay.guests} {stay.guests === "1" ? "guest" : "guests"} requested · Southampton</p>{(stay.name || stay.email || stay.message) && <dl>{stay.name && <><dt>Name</dt><dd>{stay.name}</dd></>}{stay.email && <><dt>Email</dt><dd>{stay.email}</dd></>}{stay.message && <><dt>Notes</dt><dd>{stay.message}</dd></>}</dl>}</div><div className="review-actions"><button className="button button-green" onClick={copyEnquiry}><Copy aria-hidden="true" />Copy enquiry</button><button className="button button-soft" onClick={downloadEnquiry}><Download aria-hidden="true" />Download enquiry</button></div><p className="review-feedback" role="status" aria-live="polite">{feedback || "Your enquiry has not been sent. Share it with your host to take the next step."}</p>{manualCopy && <label className="manual-copy form-field"><span>Your enquiry</span><textarea readOnly value={enquiryText(stay)} onFocus={(event) => event.target.select()} /></label>}<button className="edit-details text-link" onClick={() => { setReviewing(false); setFeedback(""); setManualCopy(false); }}>Edit your details</button><p className="form-notice"><CalendarDays aria-hidden="true" /><span>Your stay is only confirmed once dates, rates and booking arrangements have been agreed with your host.</span></p></div>}</div></DialogContent></Dialog>
    <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}><DialogContent className="gallery-dialog"><div><DialogTitle>{photos[photoIndex].title}</DialogTitle><DialogDescription>{photos[photoIndex].caption}</DialogDescription></div><img key={photoIndex} className="lightbox-main" src={`/images/${photos[photoIndex].file}-2048.webp`} alt={photos[photoIndex].alt} width={photos[photoIndex].width} height={photos[photoIndex].height} /><div className="lightbox-footer"><div className="lightbox-thumbnails" aria-label="Choose a photograph">{photos.map((photo, index) => <button key={photo.file} className="lightbox-thumb" aria-label={`View photograph ${index + 1}: ${photo.title}`} aria-pressed={photoIndex === index} onClick={() => setPhotoIndex(index)}><img src={`/images/${photo.file}-640.webp`} alt="" width="80" height="50" /></button>)}</div><p className="gallery-keyboard-hint">Use your keyboard’s left and right keys to browse.</p><span className="photo-count" aria-live="polite">0{photoIndex + 1} / 02</span></div></DialogContent></Dialog>
    <Dialog open={menuOpen} onOpenChange={setMenuOpen}><DialogContent className="menu-dialog"><DialogTitle>MIDKNIGHT PROPERTIES</DialogTitle><DialogDescription className="sr-only">Explore the apartment and plan a stay in Southampton.</DialogDescription><nav className="menu-nav" aria-label="Mobile navigation">{[["apartment", "The apartment"], ["gallery", "The gallery"], ["southampton", "Southampton"], ["questions", "Guest questions"]].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav><button className="button button-cream" onClick={openEnquiry}>Plan your stay</button></DialogContent></Dialog>
    <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}><DialogContent className="privacy-dialog"><DialogTitle>Your enquiry, your choice.</DialogTitle><DialogDescription>The stay planner prepares your enquiry in this page. It does not send your details, save them to an enquiry database, or reserve accommodation. You choose where to share the text you copy or download. Closing or refreshing this page clears the form.<br /><br />External destination guides are provided for your convenience and have their own privacy policies. Site hosting may process technical information under its own terms.</DialogDescription></DialogContent></Dialog>
  </>;
}

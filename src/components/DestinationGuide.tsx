import { ArrowDown, ArrowUpRight, Compass, Landmark, Ship, TrainFront, Trees, Waves } from "lucide-react";
import { Tabs } from "radix-ui";
import { destinationReasons, escapeDestinations, experienceGroups, itineraries } from "@/content/southampton";

type DestinationGuideProps = {
  onPlanStay: () => void;
};

type AtmosphereImageProps = {
  file: "marina-afterglow" | "woodland-morning";
  alt: string;
};

function AtmosphereImage({ file, alt }: AtmosphereImageProps) {
  const srcSet = [640, 960, 1600]
    .map((width) => `/images/${file}-${width}.webp ${width}w`)
    .join(", ");

  return (
    <picture className="destination-picture">
      <source type="image/webp" srcSet={srcSet} sizes="100vw" />
      <img
        className="destination-backdrop"
        src={`/images/${file}-1600.webp`}
        srcSet={srcSet}
        sizes="100vw"
        alt={alt}
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
}

function GuideLink({ href, children }: { href: string; children: string }) {
  return (
    <a className="guide-link" href={href} target="_blank" rel="noreferrer">
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={16} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const escapeIcons = { trees: Trees, landmark: Landmark, waves: Waves };

export default function DestinationGuide({ onPlanStay }: DestinationGuideProps) {
  return (
    <>
      <section id="southampton" className="destination-section" aria-labelledby="destination-title">
        <header className="destination-cinema">
          <AtmosphereImage
            file="marina-afterglow"
            alt="AI-generated illustration of a South Coast marina at sunset, with sailboats and warm light on the water."
          />
          <div className="destination-shade" aria-hidden="true" />
          <div className="shell destination-cinema-inner">
            <span className="eyebrow">Southampton, England</span>
            <h2 className="destination-title" id="destination-title">
              One city.<br /><em>So many ways to stay.</em>
            </h2>
            <p className="destination-lede">
              Follow medieval walls. Linger beside the marina. Make an evening of the theatre.
              With the New Forest and the Isle of Wight opening up more possibilities, Southampton
              is an invitation to make a little more of your time away.
            </p>
            <a href="#city-guide" className="text-link">
              Find your Southampton <ArrowDown size={17} aria-hidden="true" />
            </a>
            <small className="atmosphere-caption">South Coast inspiration · AI-generated illustration</small>
          </div>
          <span className="destination-index" aria-hidden="true">01 — Southampton</span>
        </header>

        <div className="destination-intro shell">
          <header className="destination-intro-heading reveal">
            <div>
              <span className="eyebrow">Why Southampton</span>
              <h2 className="section-heading">
                A little city energy.<br /><em>A little sea air.</em>
              </h2>
            </div>
            <p>
              The pleasure of Southampton is in the mix. Historic streets lead to new discoveries,
              the waterfront gives evenings their own atmosphere, and a change of scenery can be
              part of the plan. Make MidKnight your Southampton stay and build the visit around what
              you love: culture, good food, a coastal adventure or simply time together.
            </p>
          </header>
          <div className="destination-reasons">
            {destinationReasons.map((reason, index) => (
              <article className="destination-reason reveal" key={reason.title}>
                <span className="reason-number" aria-hidden="true">0{index + 1}</span>
                <div>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <section id="city-guide" className="city-guide shell" aria-labelledby="city-guide-title">
          <header className="guide-heading reveal">
            <div>
              <span className="eyebrow">The Southampton notebook</span>
              <h2 className="section-heading" id="city-guide-title">
                Days worth<br /><em>going out for.</em>
              </h2>
            </div>
            <p>
              A few places to begin, with enough variety to make the city your own. Follow your
              interests, save a little time for the unexpected, and check the official guides as
              your plans take shape.
            </p>
          </header>
          <Tabs.Root defaultValue="essentials" className="experience-tabs">
            <Tabs.List className="experience-tab-list" aria-label="Choose your Southampton interests">
              {experienceGroups.map((group) => (
                <Tabs.Trigger className="experience-tab" value={group.value} key={group.value}>
                  {group.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {experienceGroups.map((group) => (
              <Tabs.Content className="experience-content" value={group.value} key={group.value} tabIndex={0}>
                <div className="experience-grid">
                  {group.places.map((place, index) => (
                    <article className="experience-card" key={place.name}>
                      <span className="experience-kicker">
                        <span>{place.category}</span>
                        <span aria-hidden="true">0{index + 1}</span>
                      </span>
                      <h3>{place.name}</h3>
                      <p>{place.description}</p>
                      <p className="experience-tip">{place.tip}</p>
                      <GuideLink href={place.href}>{place.linkLabel}</GuideLink>
                    </article>
                  ))}
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </section>
      </section>

      <section id="escapes" className="escapes-section" aria-labelledby="escapes-title">
        <div className="escape-cinema">
          <AtmosphereImage
            file="woodland-morning"
            alt="AI-generated illustration of soft morning light through woodland, with a path winding between tall trees."
          />
          <div className="escape-shade" aria-hidden="true" />
          <div className="shell escape-cinema-inner">
            <span className="eyebrow">Stay a little longer</span>
            <h2 className="destination-title" id="escapes-title">
              City today.<br /><em>Forest tomorrow.</em>
            </h2>
            <p className="destination-lede">
              Give your break another chapter. A day among trees, a historic cathedral city or an
              island crossing can turn a Southampton visit into a stay with a little of everything.
            </p>
            <small className="atmosphere-caption">Woodland inspiration · AI-generated illustration</small>
          </div>
        </div>
        <div className="escape-cards shell">
          {escapeDestinations.map((destination) => {
            const Icon = escapeIcons[destination.icon];
            return (
              <article className="escape-card reveal" key={destination.name}>
                <div className="escape-kicker">
                  <Icon aria-hidden="true" size={23} strokeWidth={1.3} />
                  <span>{destination.tag}</span>
                </div>
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <GuideLink href={destination.href}>{destination.linkLabel}</GuideLink>
              </article>
            );
          })}
        </div>
      </section>

      <section className="itinerary-section shell" aria-labelledby="itinerary-title">
        <header className="itinerary-heading reveal">
          <div>
            <span className="eyebrow">A few days, beautifully spent</span>
            <h2 className="section-heading" id="itinerary-title">
              Imagine your<br /><em>kind of stay.</em>
            </h2>
          </div>
          <p>
            Some visits revolve around one special evening. Others need room for a few happy
            detours. Here are three ways to begin imagining yours.
          </p>
        </header>
        <Tabs.Root defaultValue="weekend" className="itinerary-tabs">
          <Tabs.List className="itinerary-tab-list" aria-label="Choose a suggested stay itinerary">
            {itineraries.map((itinerary) => (
              <Tabs.Trigger className="itinerary-tab" value={itinerary.value} key={itinerary.value}>
                {itinerary.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {itineraries.map((itinerary) => (
            <Tabs.Content className="itinerary-panel" value={itinerary.value} key={itinerary.value} tabIndex={0}>
              <div className="itinerary-intro">
                <span className="itinerary-duration">{itinerary.duration}</span>
                <h3>{itinerary.title}</h3>
                <p>{itinerary.description}</p>
                <button type="button" className="button button-green" onClick={onPlanStay}>
                  Plan this stay <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>
              <ol className="itinerary-stops">
                {itinerary.stops.map((stop) => (
                  <li className="itinerary-stop" key={stop.moment}>
                    <span className="itinerary-moment">{stop.moment}</span>
                    <div>
                      <h4>{stop.title}</h4>
                      <p>{stop.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Tabs.Content>
          ))}
        </Tabs.Root>
        <p className="itinerary-note">
          A little inspiration for your visit. Check opening times, tickets and transport with the official guides.
        </p>
      </section>

      <section className="connections-section" aria-labelledby="connections-title">
        <div className="shell connections-inner">
          <div className="connections-intro reveal">
            <span className="eyebrow">Getting here. Going further.</span>
            <h2 className="connections-heading" id="connections-title">
              Well connected.<br /><em>Wonderfully yours.</em>
            </h2>
          </div>
          <div className="connection-grid">
            <div className="connection-item reveal">
              <TrainFront aria-hidden="true" size={27} strokeWidth={1.35} />
              <h3>Arrive by rail</h3>
              <p>
                Direct trains connect London Waterloo with Southampton Central. Check your dates
                and choose the service that suits the shape of your stay.
              </p>
              <GuideLink href="https://www.southwesternrailway.com/train-times/london-waterloo-to-southampton-central">
                Plan your train journey
              </GuideLink>
            </div>
            <div className="connection-item reveal">
              <Ship aria-hidden="true" size={27} strokeWidth={1.35} />
              <h3>Make more of your cruise</h3>
              <p>
                Turn time before or after your sailing into a city break. Check your cruise line’s
                instructions and Southampton’s port information as you arrange your journey.
              </p>
              <GuideLink href="https://www.abports.co.uk/locations/southampton/">
                Explore Southampton cruise information
              </GuideLink>
            </div>
            <div className="connection-item reveal">
              <Compass aria-hidden="true" size={27} strokeWidth={1.35} />
              <h3>Let the water lead</h3>
              <p>
                Red Funnel connects Southampton with the Isle of Wight. Choose the crossing and
                onward plans that fit your island day or the next chapter of your trip.
              </p>
              <GuideLink href="https://www.redfunnel.co.uk/">
                Find your island connection
              </GuideLink>
            </div>
          </div>
          <p className="connections-note">
            Your host will confirm the full apartment address and arrival details when you arrange your stay.
          </p>
        </div>
      </section>
    </>
  );
}

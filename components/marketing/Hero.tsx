import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-20 sm:py-24 lg:py-28 xl:py-32">
      {/* Grid Pattern Background */}
      <div className="absolute inset-x-0 top-0 h-96 rotate-180 text-foreground/10 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,white)]">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="100%"
              patternTransform="translate(0 -1)"
            >
              <path d="M0 32V.5H32" fill="none" stroke="currentColor"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"></rect>
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Text */}
        <div className="relative mx-auto max-w-xl text-center lg:max-w-4xl">
          <div className="absolute -top-8 left-1/2 h-24 w-24 -translate-x-1/2 bg-primary/10 blur-2xl"></div>
          <h1 className="relative bg-gradient-to-b from-foreground to-foreground/80 bg-clip-text text-5xl font-bold leading-tight tracking-tight text-transparent sm:text-6xl xl:text-7xl">
            Your Writing Partner for
            <span className="inline-block bg-gradient-to-br from-primary to-primary/80 bg-clip-text text-3xl text-transparent sm:text-6xl xl:text-7xl">
              Better Academic Work
            </span>
          </h1>
          <h2 className="mt-8 text-lg font-normal leading-relaxed text-muted-foreground sm:text-xl lg:mx-auto lg:max-w-3xl xl:text-2xl">
            Use Notion to publish an{" "}
            <span className="text-foreground">SEO-friendly blog</span>, collect
            emails and send{" "}
            <span className="text-foreground">
              high-deliverability newsletters
            </span>{" "}
            - No coding or design skills required, just write and publish.
          </h2>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center lg:mt-12">
          <Button
            size="lg"
            className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-transform hover:scale-105"
            asChild
          >
            <a href="/pricing">Start your free trial</a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 text-base transition-transform hover:scale-105"
            asChild
          >
            <a href="/#showcase">View examples</a>
          </Button>
        </div>

        {/* Avatars Section */}
        <div className="mx-auto mt-12 max-w-xs md:flex md:max-w-lg md:flex-col md:items-center md:justify-center md:space-y-4 lg:mt-16">
          <div className="flex shrink-0 justify-center -space-x-3 overflow-hidden">
            {[
              {
                name: "Ana",
                src: "https://feather.so/images/landing/avatars/ana.png",
              },
              {
                name: "Anthony",
                src: "https://feather.so/images/landing/avatars/anthony.png",
              },
              {
                name: "Ayush",
                src: "https://feather.so/images/landing/avatars/ayush.png",
              },
              {
                name: "Damon",
                src: "https://feather.so/images/landing/avatars/damon.png",
              },
              {
                name: "Roberto",
                src: "https://feather.so/images/landing/avatars/roberto.png",
              },
              {
                name: "Alex MacCaw",
                src: "https://feather.so/images/landing/avatars/alex.png",
              },
              {
                name: "Tibo",
                src: "https://feather.so/images/landing/avatars/tibo.png",
              },
              {
                name: "Corey Haines",
                src: "https://feather.so/images/landing/avatars/corey.png",
              },
              {
                name: "Vensy",
                src: "https://feather.so/images/landing/avatars/vensy.png",
              },
              {
                name: "Tom",
                src: "https://feather.so/images/landing/avatars/tom.png",
              },
            ].map((avatar) => (
              <img
                key={avatar.name}
                alt={avatar.name}
                src={avatar.src}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-background"
              />
            ))}
          </div>
          <p className="mt-6 text-center text-base text-muted-foreground md:mt-0 md:ml-4">
            <span className="block">
              Join{" "}
              <span className="font-semibold text-foreground">
                175+ creators, and new-age startups
              </span>{" "}
            </span>
            <span className="block">
              and start publishing your content today
            </span>
          </p>
        </div>

        {/* Hero Image */}
        <div className="mx-auto mt-12 max-w-5xl lg:mt-16">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 blur-2xl"></div>
            <img
              alt="Hero Mockup"
              src="https://feather.so/images/landing/hero-mockup.png"
              className="relative w-full rounded-2xl object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-8 text-center">
          <p className="text-lg font-semibold text-muted-foreground">
            Trusted by 100+ startups
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:mt-10 lg:gap-x-16 lg:gap-y-8">
            {[
              {
                name: "Tweet Hunter",
                src: "https://feather.so/images/landing/logos/tweet-hunter.svg",
                className: "h-6 lg:h-8",
              },
              {
                name: "Testimonial",
                src: "https://feather.so/images/landing/logos/testimonial.svg",
                className: "h-8 lg:h-10",
              },
              {
                name: "Xumm",
                src: "https://feather.so/images/landing/logos/xumm.svg",
                className: "h-6",
              },
              {
                name: "Green Got",
                src: "https://feather.so/images/landing/logos/green-got.png",
                className: "h-8 lg:h-10",
              },
              {
                name: "GrowthX",
                src: "https://feather.so/images/landing/logos/growthx.png",
                className: "h-6 lg:h-7",
              },
            ].map((logo) => (
              <img
                key={logo.name}
                alt={logo.name}
                src={logo.src}
                className={`w-auto object-contain ${logo.className}`}
              />
            ))}

            {/* Special Logo Groups */}
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7">
                <img
                  alt="Reflect"
                  src="https://feather.so/images/landing/logos/reflect.png"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="cursor-default text-2xl font-semibold tracking-wide">
                Reflect
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="h-7 w-7">
                <img
                  alt="SwipeWell"
                  src="https://feather.so/images/landing/logos/swipewell.png"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="cursor-default text-2xl font-semibold tracking-wide">
                <span>Swipe</span>
                <span className="text-[rgb(2,132,199)]">Well</span>
              </div>
            </div>

            {/* Remaining Logos */}
            {[
              {
                name: "Beyonk",
                src: "https://feather.so/images/landing/logos/beyonk.svg",
                className: "h-4 lg:h-5",
              },
              {
                name: "Taplio",
                src: "https://feather.so/images/landing/logos/taplio.svg",
                className: "h-6 lg:h-8",
              },
              {
                name: "Lal10",
                src: "https://feather.so/images/landing/logos/lal10.png",
                className: "h-12",
              },
              {
                name: "Indie Worldwide",
                src: "https://feather.so/images/landing/logos/indie-worldwide.png",
                className: "h-6 lg:h-10",
              },
            ].map((logo) => (
              <img
                key={logo.name}
                alt={logo.name}
                src={logo.src}
                className={`w-auto object-contain ${logo.className}`}
              />
            ))}

            <div className="flex items-center space-x-2">
              <div className="h-8 w-8">
                <img
                  alt="BotGhost"
                  src="https://feather.so/images/landing/logos/botghost.png"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="cursor-default text-2xl font-semibold tracking-tighter">
                BotGhost
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

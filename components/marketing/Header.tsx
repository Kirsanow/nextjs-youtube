import SVGLogo from "../svg-logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-20">
      <div className="absolute inset-0 opacity-20 blur bg-conic-gradient"></div>
      <div className="relative bg-background py-4 backdrop-blur-lg">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative z-10 shrink-0">
              <a href="/" title="Feather" className="flex">
                <SVGLogo />
              </a>
            </div>

            <div className="hidden lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center lg:gap-2">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {/* Add product menu items here if needed */}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      href="/pricing"
                    >
                      Pricing
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      href="/showcase"
                    >
                      Showcase
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      href="https://feather.so/blog"
                    >
                      Blog
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                      href="https://feather.so/help"
                    >
                      Help Docs
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="relative z-10 flex items-center gap-x-3">
              <div className="hidden sm:block">
                <Button variant="outline" asChild>
                  <a href="/login">Login</a>
                </Button>
              </div>
              <Button asChild>
                <a href="/pricing">Get started</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

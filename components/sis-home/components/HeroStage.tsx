import type { HomeContent } from "../content/home.tr";
import { AgentPanel } from "./AgentPanel";
import { HeroLandscape } from "./HeroLandscape";

type Props = { content: HomeContent };

/**
 * The landscape with the glass agent panel over its right side.
 * Two soft Nova lights drift slowly behind the glass (decorative) so the frosted panel always has
 * colour to refract. HeroLandscape itself is unchanged from E. Sis.
 */
export function HeroStage({ content }: Props) {
  return (
    <div className="pn-stage">
      <div className="pn-stage__lights" aria-hidden="true">
        <span className="pn-stage__light pn-stage__light--blue" />
        <span className="pn-stage__light pn-stage__light--white" />
      </div>
      <HeroLandscape />
      <AgentPanel content={content} />
    </div>
  );
}

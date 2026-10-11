import type { HomeContent } from "../content/home.tr";
import { MotionToggle } from "./MotionToggle";

type Props = { content: HomeContent };

/**
 * Frosted-glass panel floating over the hero landscape (design "E3. Cam").
 * A 12 s CSS loop plays a sample conversation: incoming message, two agent steps, typing, reply,
 * hand-off to a person. It is always labelled "Örnek senaryo" (sample scenario): never real data.
 *
 * Every line is real text in the DOM, so screen readers get the whole exchange at once; only the
 * visual entrance is animated. Pebbles are decorative.
 */
export function AgentPanel({ content }: Props) {
  const d = content.agentDemo;
  return (
    <div className="pn-agent">
      <span className="pn-agent__pebble pn-glass pn-agent__pebble--1" aria-hidden="true">{d.channels[0]}</span>
      <span className="pn-agent__pebble pn-glass pn-agent__pebble--2" aria-hidden="true">{d.channels[1]}</span>
      <span className="pn-agent__pebble pn-glass pn-agent__pebble--3" aria-hidden="true">{d.channels[2]}</span>

      <figure className="pn-agent__panel pn-glass" aria-label={d.ariaLabel}>
        <figcaption className="pn-agent__head">
          <span className="pn-agent__title"><span className="pn-agent__live" aria-hidden="true" />{d.title}</span>
          <span className="pn-tag pn-tag--sample">{d.scenarioTag}</span>
        </figcaption>
        <div className="pn-agent__flow">
          <div className="pn-agent__msg pn-agent__msg--in pn-agent__r1">
            <div className="pn-agent__meta">{d.incomingMeta}</div>
            {d.incoming}
          </div>
          <div className="pn-agent__step pn-agent__r2"><span className="pn-agent__check" aria-hidden="true">✓</span><span>{d.steps[0]}</span></div>
          <div className="pn-agent__step pn-agent__r3"><span className="pn-agent__check" aria-hidden="true">✓</span><span className="pn-agent__shimmer">{d.steps[1]}</span></div>
          <div className="pn-agent__typing" aria-hidden="true"><span /><span /><span /></div>
          <div className="pn-agent__msg pn-agent__msg--out pn-agent__r4">
            <div className="pn-agent__meta">{d.replyMeta}</div>
            {d.reply}
          </div>
          <div className="pn-agent__handoff pn-agent__r5">
            <span><span className="pn-agent__dot" aria-hidden="true" />{d.handoff}</span>
            <strong>{d.handoffAction}</strong>
          </div>
        </div>
      </figure>
      <div className="pn-agent__controls">
        <MotionToggle pauseLabel={d.pauseLabel} playLabel={d.playLabel} />
      </div>
    </div>
  );
}

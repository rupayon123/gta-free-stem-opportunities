import { writeFileSync } from "node:fs";
import { opportunities } from "../lib/data";

const visible = opportunities.filter((opportunity) => {
  const visibleUntil = opportunity.endDate || opportunity.deadline || opportunity.startDate;
  return !visibleUntil || new Date(visibleUntil).getTime() >= Date.now() - 24 * 60 * 60 * 1000;
});

const output = {
  data: visible,
  meta: {
    activeCount: visible.length,
    lastUpdated: new Date().toISOString()
  }
};

writeFileSync("apps/ios/GTAFreeSTEM/Resources/opportunities.json", `${JSON.stringify(output, null, 2)}\n`);
console.log(`Exported ${visible.length} iOS offline opportunities.`);

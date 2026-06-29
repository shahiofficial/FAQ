/* Kairali Trails — "Kaity" AI proxy (Cloudflare Worker)
 * Holds your Anthropic API key server-side and answers from the FAQ below.
 * Accepts:  POST { messages:[{role:"user"|"assistant",content:"..."}] }
 * Returns:  { reply:"..." }
 * Deploy + set the ANTHROPIC_API_KEY secret — see README (## AI Kaity).
 */
const KNOWLEDGE = `Q: How much luggage can I carry?
A: Check-in allowance is 30 kg plus one cabin bag per person. Confirm your exact figure on the ticket once issued. Keep liquids, aerosols and gels in containers 100 ml or smaller unless they're in tamper-evident duty-free bags. Power banks go in cabin baggage only , never check-in.

Q: How much cash should I carry, and how do I exchange it?
A: Please complete your currency exchange before you travel . As a guide, for 2 passengers the equivalent of ₹25,000 in MYR is advisable — adjust to your own preference. Carry a mix: MYR cash , a forex card , and an international credit or debit card for hassle-free transactions. You can also carry some INR cash and convert it to MYR at the Indian airport before you fly.

Q: What adapter / plug do I need?
A: Malaysia uses the Type G socket (UK-style, three rectangular pins) at 240V — different from India. Carry a universal travel adapter and you're covered. Most phone and laptop chargers handle 240V fine; double-check any hair dryer or shaver before plugging in.

Q: How do I get a SIM / internet?
A: After arriving in Malaysia, you can buy a SIM from the official Hotlink SIM card shop located right after immigration. They offer convenient 1-week data plans , so you stay connected throughout your trip.

Q: Where do I meet the team at the airport?
A: Your arrival point is KLIA Terminal 2 (klia2) . An airport representative will be waiting in the arrival area near the Hotlink SIM card shop , by pillar B , holding a "Welcome Kairali Trails" placard. Our coordinator will also update you in advance about the receiving and pickup procedure, to ensure a smooth arrival. If you don't spot the board right away, don't worry — the coordinators are online to assist.

Q: How do pickups and transfers work?
A: Guests arrive on different flights at different times. Freshen up, grab a snack, or explore KLIA — your transfer happens once all group members have arrived . Itinerary and timings are fixed once booking is complete and can't be customised. Please follow the given timings — drivers cannot wait , and any missed pickup is the guest's responsibility.

Q: Is there a dress code for temples?
A: Dress modestly at temples and religious sites such as Batu Caves . Avoid sleeveless tops, short skirts and shorts; keep shoulders and knees covered . A lightweight scarf or cover-up is highly recommended. If you arrive without one, wraps can usually be rented at the entrance for a small (often refundable) fee.

Q: What's the security deposit at the hotel?
A: Hotels collect a refundable security deposit in the lobby as assurance against property damage — returned to you at checkout: - Deface — 300 RM per room - Ceylonz — 300 RM per room - Pacific Express — 300 RM per room Please keep accommodation clean and well-maintained — any damage or rule violation may be charged by the property.

Q: Is breakfast included?
A: Breakfast is included only with the Signature package . If you're on the Signature package, a breakfast menu has been shared with you.

Q: Where's my day-by-day plan?
A: Your detailed 4-day general itinerary has been shared as a PDF — please save it offline before you fly. Timings may change with the situation. Your coordinator will share updated timings before departure for each destination.

Q: When should I reach the airport?
A: Check your flight timings and reach the airport at least 3 hours before departure for smooth boarding. Elderly passengers can request special assistance from airport ground staff for a comfortable, stress-free experience.

Q: Can I carry gold / jewellery?
A: Yes — keep gold and jewellery in your cabin (carry-on) bag, never in check-in , to avoid loss or theft. It counts within your cabin weight allowance. Carry your original purchase invoices . For high-value pieces, declare them at the Indian Customs counter before immigration when leaving and ask for an Export Certificate — this lets you bring them back to India duty-free. Duty-free limits on the way back depend on how long you were abroad and are set by Indian Customs. Anything above your allowance must be declared. Please confirm the current limits before you travel, or ask us.

Q: How do I keep my valuables safe?
A: Keep money, jewellery, electronics and important documents safely with you at all times . Any loss of personal belongings is the passenger's responsibility, and the company is not liable.

Q: What type of accommodation is provided?
A: Serviced apartments are provided for most Malaysia packages. The exact apartment depends on your booking and availability at check-in.

Q: Is there a kitchen in the accommodation?
A: Not all serviced apartments have a kitchen — it depends on the property assigned.

Q: Will my room have a Twin Towers or city view?
A: Room views are subject to availability and can't be guaranteed. Many properties offer a city view from the infinity pool.

Q: When will I receive my flight tickets?
A: Flight tickets are shared as soon as the airline issues them. If your travel date is weeks away, they may be released closer to departure.

Q: Is daily housekeeping included?
A: Most serviced apartments don't provide daily housekeeping. Cleaning depends on the property's policy.

Q: Will I have to wait at the airport?
A: As this is a group tour, there may be a short wait if other passengers arrive on different flights or if flights are delayed.

Q: Are meals included on the flight?
A: No. Meals and drinking water aren't included with the flight unless purchased separately.

Q: Can I choose my flight seat?
A: Seats are usually assigned automatically by the airline. Preferred seat selection may be available for an extra charge.

Q: How much cabin baggage is included?
A: AirAsia normally includes one 7 kg cabin bag. Extra baggage can be purchased before departure.

Q: Where should I exchange currency?
A: You can exchange currency in your hometown if available, or at the departure airport before your flight.

Q: How much cash should I carry?
A: For two travellers, around ₹25,000 worth of Malaysian Ringgit is generally enough. Your spending may vary with shopping and personal expenses.

Q: Can I use credit or debit cards?
A: International Visa, Mastercard and Forex cards are widely accepted. Credit cards are recommended; debit card acceptance varies.

Q: Are Twin Towers tickets included?
A: No. Twin Towers tickets aren't included and must be booked in advance, as same-day availability is limited.

Q: Are KL Tower and Aquaria tickets included?
A: No. These can be arranged through our online coordinator before your visit if required.

Q: Do Indian citizens need a visa for Malaysia?
A: Eligible Indian travellers can travel under the applicable Malaysia entry scheme. Entry requirements and documents are shared before departure.

Q: Is there a tour guide?
A: An online coordinator assists throughout your trip. Depending on the itinerary, driver-guides may also provide local help.

Q: What should I wear?
A: Wear modest clothing at religious places. For pools, suitable swimwear such as lycra or nylon is recommended.

Q: Can I carry food on the flight?
A: Yes. Light snacks like sandwiches, nuts or chocolates are usually allowed if packed properly.

Q: Can I carry medicines on the flight?
A: Yes. Carry medicines in their original packaging. Prescription medicines should have a valid prescription and bill where applicable.

Q: Is the itinerary fixed?
A: Yes. Tour timings are fixed and may change slightly due to traffic or operational needs.

Q: Is the package refundable?
A: Unless stated otherwise, packages are generally non-refundable. Contact our team for the cancellation policy for your booking.

Q: Can I carry liquids in my hand baggage?
A: Yes, but each container must be 100 ml or less and comply with airline security rules.`;

const SYSTEM = `You are Kaity, the friendly virtual trip assistant for Kairali Trails, a travel company. You help customers travelling from India to Malaysia (Kuala Lumpur).

Rules:
- Answer ONLY using the Kairali Trails information below.
- Keep replies short, warm and clear (2–4 sentences; use simple bullet points when useful).
- Never invent specifics (prices, visa rules, times, deposits) that are not stated.
- If a question is outside this info or needs a human, say so briefly and tell them to contact their Service Advisor, Afrin.
- No legal, medical or financial guarantees.

--- KAIRALI TRAILS · MALAYSIA INFO ---
${KNOWLEDGE}
--- END INFO ---`;

const CORS = {
  "Access-Control-Allow-Origin": "*",                 // tighten to your site origin in production
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    if (request.method !== "POST")   return new Response("POST only", { status: 405, headers: CORS });

    let messages;
    try { ({ messages } = await request.json()); } catch { return json({ error: "bad json" }, 400); }
    if (!Array.isArray(messages)) return json({ error: "messages[] required" }, 400);

    const payload = {
      model: "claude-haiku-4-5-20251001",   // fast + low cost; check docs.claude.com for current models
      max_tokens: 400,
      system: SYSTEM,
      messages: messages.slice(-8).map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content || "").slice(0, 2000),
      })),
    };

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) return json({ error: "upstream " + r.status }, 502);
    const data = await r.json();
    const reply = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
    return json({ reply: reply || "Sorry, I couldn't answer that just now." });
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json", ...CORS } });
}

const diagrams = require("./diagrams");

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const planned = ["Planned feature", "This describes intended product behavior. EraX Digital has not made this capability publicly available."];
const concept = ["Conceptual architecture", "This is a proposed design. It does not describe a deployed service, contract, or integration."];
const milestone = ["Development status", "The public plan is organized by year from 2026 through 2028. Completed foundation work and the current EraX Social product are 2026. Wallet, creator payments, and broader ecosystem work are later years."];
const future = ["Future development", "This item is a possible later direction. It is not a committed release."];

function page(slug, category, title, description, blocks) {
  return { slug, category, title, description, blocks };
}
function p(text) { return { type: "p", text }; }
function h(text) { return { type: "h2", text }; }
function ul(items) { return { type: "ul", items }; }
function callout(pair) { return { type: "callout", label: pair[0], text: pair[1] }; }
function table(headers, rows) { return { type: "table", headers, rows }; }
function diagram(id) { return { type: "diagram", id }; }
function code(label, text) { return { type: "code", label, text }; }

const company = "EraX Digital is an independent Web3 technology company developing a connected digital ecosystem that brings together social networking, digital ownership, wallet infrastructure, and creator-focused experiences.";

const categories = [
  { id: "start", title: "Getting Started" },
  { id: "ecosystem", title: "Ecosystem Overview" },
  { id: "social", title: "EraX Social" },
  { id: "wallet", title: "EraX Wallet" },
  { id: "creator", title: "EraX Creator" },
  { id: "chain", title: "Blockchain and Technology" },
  { id: "security", title: "Security and Privacy" },
  { id: "roadmap", title: "Development Roadmap" },
  { id: "developer", title: "Developer Resources" },
  { id: "reference", title: "Glossary and FAQ" },
];

const pages = [
  page("introduction", "start", "Introduction to EraX Digital", "What EraX Digital is, what it is building, and what is not yet available.", [
    callout(["Current company information", company]),
    p("The working tagline is Connect. Create. Own. It describes the relationship between social participation, creative work, and digital ownership."),
    h("What the company is building"),
    p("The core direction is a SocialFi ecosystem: social interaction, digital identity, wallet connectivity, creator monetization, and blockchain-based ownership in one product family. EraX Social is the current social product. EraX Wallet and EraX Creator are planned. EraX Assets is a potential future product, not a current service."),
    h("What this documentation is"),
    p("These pages explain the product and the written technical design. They do not claim a deployed token, an audit, a user count, or a token sale."),
    ul(["EraX Social is available at https://erax-digital.vercel.app/.", "Ethereum Mainnet is the primary network for ownership and settlement.", "Base, an Ethereum Layer 2, is the intended network for the ERAX token and for later creator payments.", "The public roadmap is organized as 2026, 2027, and 2028."]),
  ]),
  page("what-is-socialfi", "start", "What Is SocialFi?", "A plain-language definition of SocialFi and how EraX Digital uses the term.", [
    callout(concept),
    p("SocialFi, short for social finance, describes products that combine social networking with digital ownership and payments. A person can publish, follow, and participate in a community, and selected economic actions can be authorized by a wallet rather than only by a platform account."),
    h("What the term does not mean here"),
    p("In this documentation, SocialFi does not mean a token launch, a yield product, or a promise of income. It means a product direction: social software plus wallet-connected ownership and creator payments."),
    h("Why the distinction matters"),
    p("Social actions such as reading a feed are different from financial actions such as approving a payment. EraX Digital's proposed design keeps that distinction visible to the user."),
  ]),
  page("ecosystem-overview", "start", "EraX Digital Ecosystem Overview", "How the planned products fit together.", [
    callout(concept),
    diagram("ecosystem"),
    p("EraX Social is the current place for profiles, feeds, communities, and messages, at https://erax-digital.vercel.app/. EraX Wallet is the planned place for connecting to Ethereum and Base, seeing assets, and authorizing transactions. EraX Creator is the planned place for paid content, subscriptions, and tips. EraX Assets is reserved for possible later work on issuance and tokenization."),
    h("How a person would move through the ecosystem"),
    ul(["Create an account and a profile in EraX Social.", "Connect a wallet when an action needs one.", "Publish or participate without a chain transaction for ordinary social activity.", "Use EraX Creator when a payment or subscription is involved.", "Treat EraX Assets as unavailable."]),
  ]),
  page("vision", "start", "Platform Vision and Objectives", "The stated vision and the design objectives that follow from it.", [
    callout(["Current company information", "To create a connected digital world where people, communities and digital assets can interact, create value and grow together."]),
    p("The mission used on the website is to simplify access to Web3 technology by combining social experiences, digital ownership, and financial infrastructure into one accessible digital ecosystem."),
    h("Design objectives"),
    ul(["Make social participation understandable without specialist knowledge.", "Keep ownership actions explicit and user-approved.", "Give creators a planned path to charge for access, subscriptions, and tips.", "Use Ethereum and Base rather than inventing a separate Layer 1.", "Say clearly when a feature is planned rather than available."]),
    h("Principles"),
    p("The public principles are Accessibility, User Ownership, Transparency, and Innovation. In documentation, transparency means labeling planned work as planned."),
    h("2026 to 2028"),
    ul(["2026: company foundation, core infrastructure, and EraX Social as the current product. The ERAX token is specified and not deployed.", "2027: intended work on EraX Wallet, EraX Creator, and security testing. Token deployment is not scheduled and is not a sale.", "2028: ecosystem growth. EraX Assets stays a future possibility and is not an investment product."]),
  ]),
  page("development-status", "start", "Development Status", "What 2026, 2027, and 2028 mean for the product.", [
    callout(milestone),
    diagram("roadmap"),
    table(["Year", "Focus", "Status"], [
      ["2026", "Foundation, infrastructure, and EraX Social", "Foundation completed. Social product available."],
      ["2027", "Wallet, creator tools, and security testing", "Planned. Not a public beta date."],
      ["2028", "Ecosystem growth", "Future development. EraX Assets is not operational."],
    ]),
    p("Earlier foundation work covered company positioning, the Ethereum and Base direction, and the technical architecture for accounts, data, and wallet connectivity. That work does not mean every product is public. EraX Wallet, EraX Creator, and EraX Assets are not the current social product. The ERAX token is specified, not deployed, and not offered for sale."),
  ]),
  page("faq", "start", "Frequently Asked Questions", "Short answers about the company, products, networks, and status.", [
    h("Is the platform live?"),
    p("EraX Social is available at https://erax-digital.vercel.app/. It includes accounts, posts, follows, comments, bookmarks, communities, and messages. Wallet sign-in can use an Ethereum or Solana signature. EraX Wallet, EraX Creator, and EraX Assets are not that product. Creator subscriptions and on-chain payments are not in the current social build."),
    h("Which networks are intended?"),
    p("Ethereum Mainnet is the primary network for ownership and settlement. Base is the intended Layer 2 for the ERAX token and for later creator payments. No contract address is published because the token contract is not deployed."),
    h("Is there a token?"),
    p("The ERAX token is specified as an ERC-20 with a fixed supply of 1,000,000,000 tokens, 18 decimals, and a 0% transfer tax. It is not deployed, not audited, and not for sale. There is no published price, yield, or contract address. The proposed allocation is at /tokenomics. The full FAQ is /docs/erax-tokenomics-faq.pdf."),
    h("Does the company custody assets?"),
    p("The wallet architecture is not verified as custodial or non-custodial. Until that design is implemented and documented from the product itself, this site does not claim either model."),
    h("Where can I read the longer document?"),
    p("The technical whitepaper is a separate page. It uses the same facts and the same limits."),
  ]),
  page("ecosystem-architecture", "ecosystem", "Ecosystem Architecture", "A conceptual map of product responsibilities.", [
    callout(concept),
    diagram("platform"),
    p("The proposed stack separates what a person sees from where data is stored and from which actions require a blockchain transaction. Social software can remain responsive while ownership and payment actions stay explicit."),
    h("Responsibility split"),
    table(["Layer", "Responsibility", "Status"], [
      ["Experience", "Screens for social, wallet, and creator tasks", "Planned"],
      ["Social application", "Profiles, feeds, communities, messages", "Available in EraX Social"],
      ["Identity", "Account, session, and permission concepts", "Foundational design only"],
      ["Wallet", "Connection and transaction approval", "Planned"],
      ["Data", "Off-chain content and settings", "Not deployed in this repository"],
      ["Contracts", "Selected payment and ownership logic", "Not deployed"],
      ["Networks", "Base and Ethereum Mainnet", "Target networks, not a live integration"],
    ]),
  ]),
  page("product-overview", "ecosystem", "Product Overview", "The four product names and their current status.", [
    callout(planned),
    table(["Product", "Intended role", "Status"], [
      ["EraX Social", "Profiles, feeds, publishing, communities, messaging, wallet-connected experiences", "Available"],
      ["EraX Wallet", "Ethereum and Base connectivity, asset visibility, transaction authorization", "Planned"],
      ["EraX Creator", "Creator profiles, paid content, subscriptions, tips, payments", "Planned"],
      ["EraX Assets", "Possible issuance and tokenization", "Future, not operational"],
    ]),
    p("EraX Social is the current product. EraX Wallet and EraX Creator are planned. EraX Assets is not an investment product and is not operational."),
  ]),
  page("user-experience", "ecosystem", "User Experience", "How the intended experience is meant to feel.", [
    callout(planned),
    p("A new person should be able to understand the product without already knowing how a wallet works. Ordinary browsing, posting, and discussion are intended to feel like social software. When an action moves value or records ownership, the interface should stop and ask for an explicit wallet decision."),
    h("Experience rules"),
    ul(["Use plain language for network, fee, and approval prompts.", "Do not hide a payment inside a social action.", "Show whether an action is off-chain or will be submitted to a network.", "Keep EraX Assets out of the current user path."]),
  ]),
  page("digital-identity", "ecosystem", "Digital Identity", "Accounts, profiles, and wallet addresses are different things.", [
    callout(concept),
    p("A platform account identifies a person inside EraX Social. A public profile is what other people can see. A wallet address identifies a key holder on Ethereum or Base. The proposed design may link them, but a link is not the same thing as merging them."),
    h("Proposed separation"),
    ul(["Account: sign-in and settings.", "Profile: name, biography, and social graph.", "Wallet address: a public key address used for ownership and payments.", "The person chooses when an address is shown on a profile."]),
    p("No sign-in protocol is implemented in this repository. Wallet sign-in, such as Sign-In with Ethereum, is a possible later choice, not a current integration."),
  ]),
  page("social-interaction", "ecosystem", "Social Interaction Model", "The intended shape of feeds, responses, and communities.", [
    callout(planned),
    diagram("social-flow"),
    p("The social model is conventional on purpose: people publish posts, respond with likes and comments, join communities, and send messages. Those actions are candidates for off-chain storage so the product can stay fast and avoid a network fee for every click."),
    p("Wallet connection is adjacent to this model. It is required only when the person chooses an ownership or payment action, not as a toll for reading a feed."),
  ]),
  page("wallet-and-ownership", "ecosystem", "Wallet and Digital Ownership", "What ownership means in the proposed ecosystem.", [
    callout(concept),
    p("Digital ownership here means that selected records — for example a payment, a subscription entitlement, or a future asset — can be authorized by the user's wallet and recorded on Ethereum or Base. It does not mean that every post, like, or message is an on-chain asset."),
    h("Terms that are easy to mix up"),
    table(["Term", "Meaning in this documentation"], [
      ["Connected external wallet", "A wallet the user already controls. The application requests a connection and the user approves or rejects it."],
      ["Wallet interface", "Screens that prepare, explain, and display transactions. An interface is not itself custody."],
      ["Custodial wallet", "A service that holds keys for the user. EraX Digital does not claim to offer this."],
      ["Non-custodial wallet", "The user holds the keys. EraX Digital does not claim this model is implemented."],
    ]),
  ]),
  page("creator-economy", "ecosystem", "Creator Economy", "How creator monetization is intended to fit the social product.", [
    callout(planned),
    p("EraX Creator is the planned set of tools for a person who publishes work and wants to charge for it. The intended tools are creator profiles, content management, paid posts, subscriptions, tips, and payments on Base."),
    p("Social distribution can live in EraX Social. Payment authorization can live with the wallet and, later, with smart contracts. Those contracts are not deployed from this project."),
    diagram("creator-pay"),
  ]),
  page("future-modules", "ecosystem", "Future Ecosystem Modules", "Work that is explicitly not part of the current product set.", [
    callout(future),
    p("2028 names possible later work: advanced creator and community tools, additional wallet capability, rewards or staking, cross-chain interoperability, tokenization, and integrations. None of these are scheduled, and none are available."),
    ul(["EraX Assets remains a future possibility for issuance and tokenization.", "Rewards and staking are not a live program and have no published rate.", "Cross-chain behavior is not designed as a bridge product in the current site."]),
  ]),
];

function feature(slug, category, title, description, body, tone) {
  const socialNow = ["EraX Social", "The social product is available at https://erax-digital.vercel.app/. Accounts, posts, follows, comments, bookmarks, communities, and messages are part of that product. Creator subscriptions and on-chain payments are not."];
  const lead = tone === "concept" ? callout(concept) : tone === "none" ? null : category === "social" ? callout(socialNow) : callout(planned);
  const blocks = body[0] && body[0].type === "callout" ? body : lead ? [lead].concat(body) : body;
  pages.push(page(slug, category, title, description, blocks));
}

feature("social-overview", "social", "EraX Social Overview", "The current social product.", [
  p("EraX Social is the social product at https://erax-digital.vercel.app/. People can create an account, publish, follow, comment, bookmark, join communities, and send messages. Connecting a wallet is optional and can use an Ethereum or Solana signature. Portfolio prices are not shown. Creator subscriptions and on-chain payments are not part of this build."),
  h("Current scope"),
  ul(["Accounts and profiles.", "Posts from people and communities.", "Comments, follows, and bookmarks.", "Community spaces.", "Private messaging.", "Optional wallet signature for sign-in."]),
  diagram("social-flow"),
]);
feature("user-registration", "social", "User Registration", "How account creation is intended to work.", [
  p("Registration is planned as an account step, not as a blockchain transaction. A person would provide the minimum information needed to create a profile and recover access. The exact fields are not implemented in this repository."),
  h("Design intent"),
  ul(["Collect only what the account needs.", "Do not require a wallet before the person can read or create a basic profile.", "Offer a wallet connection later, as an optional or action-specific step.", "Do not present registration as completed KYC or as a regulated onboarding flow."]),
]);
feature("user-profiles", "social", "User Profiles", "What a profile is intended to show.", [
  p("A profile is the public face of an account: a name, a short biography, a picture, and the person's posts. A wallet address may be shown only if the person attaches one and chooses to display it."),
  h("Not included"),
  p("Profiles are not tokens, not verified badges from a government, and not proof of followers or revenue. No usage statistics are published."),
]);
feature("social-feeds", "social", "Social Feeds", "How the feed is intended to behave.", [
  p("A feed is a list of posts from accounts and communities a person follows. Ranking, if used, should be explainable. The feed is an off-chain candidate because loading it should not require a network fee."),
  ul(["Posts the user follows.", "Community posts the user has joined.", "The user's own posts.", "A way to tell a social item from a paid item."]),
]);
feature("content-publishing", "social", "Content Publishing", "How publishing is intended to work.", [
  p("Publishing means creating a post that other people can read according to the audience the author selects. Paid publishing belongs to EraX Creator. Ordinary publishing belongs to EraX Social."),
  p("The storage location for media is not chosen in this repository. Any future choice should be described as off-chain storage with a reference from the post, unless a specific on-chain record is actually required."),
]);
feature("likes-and-comments", "social", "Likes and Comments", "Responses to posts.", [
  p("Likes and comments are social responses. The proposed design stores them off-chain. They are not, by default, transfers of value and they should not open a wallet approval."),
  p("If a later product lets a response include a tip, that tip is a separate payment action with its own review step."),
]);
feature("communities", "social", "Communities", "Group spaces inside EraX Social.", [
  p("A community is a planned space with a name, a description, members, and posts. Membership rules can be open or limited. Payment-gated communities, if offered later, belong with EraX Creator and must show the price before anyone joins."),
  p("Community administration tools are not specified beyond the need for a clear owner and the ability to remove abusive content. No moderation vendor is integrated."),
]);
feature("messaging", "social", "Messaging", "Private messages.", [
  p("Private messaging is planned as a direct conversation between accounts. Message contents are a poor fit for a public blockchain because public networks do not provide confidentiality. The proposed design keeps message bodies off-chain."),
  p("End-to-end encryption is not claimed. If it is added later, the documentation should describe the actual protocol rather than a slogan."),
]);
feature("wallet-connected-experiences", "social", "Wallet-Connected Experiences", "Where EraX Social would hand off to a wallet.", [
  p("A wallet-connected experience is a social screen that can start a wallet action: show a connected address, start a tip, or open a paid post. The social screen explains the action. The wallet, not the feed, collects the approval."),
  diagram("wallet-flow"),
  p("No wallet SDK is wired into this website. Screens on the product pages are descriptive, not a working connection."),
]);
feature("social-privacy", "social", "Privacy and User Controls", "Controls a social product should offer.", [
  ul(["Choose what a profile shows.", "Choose who can reply or message.", "Separate public posts from direct messages.", "Understand that a submitted blockchain transaction is public even if the social post is limited.", "Delete or hide off-chain content, while understanding that a confirmed on-chain record cannot be silently erased."]),
]);

feature("wallet-overview", "wallet", "Wallet Overview", "What EraX Wallet is intended to be.", [
  p("EraX Wallet is a planned wallet experience for Ethereum and Base connectivity, digital asset management, portfolio visibility, and transaction authorization. It is not available yet."),
  p("Until the implementation exists, do not read this page as a claim that EraX Digital holds keys, runs a signer, or operates a node."),
  table(["Model", "Who holds the keys", "Claimed today"], [
    ["External connected wallet", "The user, in their own wallet", "Not integrated"],
    ["Wallet interface", "Depends on the wallet behind the interface", "Planned screens only"],
    ["Custodial service", "The service", "Not claimed"],
    ["Non-custodial service", "The user", "Not claimed as a shipped product"],
  ]),
]);
feature("ethereum-connectivity", "wallet", "Ethereum Connectivity", "The intended role of Ethereum Mainnet.", [
  p("Ethereum Mainnet is the planned primary network for ownership and settlement. It is a Layer 1 network. Transactions on it are public, ordered by the Ethereum protocol, and paid for with gas."),
  p("EraX Digital does not operate Ethereum. An application can submit transactions only when a user signs them in a wallet, or through a future service whose trust model has been explicitly documented."),
]);
feature("base-connectivity", "wallet", "Base Network Connectivity", "The intended role of Base.", [
  p("Base is an Ethereum Layer 2 network. It is not an independent Layer 1. The planned use is everyday activity: creator payments, subscriptions, and other user transactions where a lower fee is appropriate."),
  p("A Base transaction still follows wallet approval and a gas fee denominated in Ether on that network. No Base RPC endpoint is configured in this repository."),
]);
feature("wallet-connection", "wallet", "Wallet Connection Process", "The intended steps to connect a wallet.", [
  diagram("wallet-flow"),
  olSafe(),
]);

function olSafe() {
  return ul([
    "The user asks to connect from an EraX screen.",
    "The application requests accounts from a wallet the user already has. No specific wallet vendor is mandated here.",
    "The wallet shows the request. The user approves or rejects it.",
    "The application may then display the address. A connection is not a blank approval to move funds.",
    "Each value-moving transaction is reviewed again before it is signed.",
  ]);
}

feature("asset-management", "wallet", "Digital Asset Management", "What a portfolio view is intended to show.", [
  p("A portfolio view would list Ether and supported assets that the connected address holds on Ethereum and Base. Balances come from the networks or from an indexer. They are not balances held by EraX Digital unless a custodial model is explicitly shipped, which it has not been."),
  p("The set of supported assets is not defined. No token list is published."),
]);
feature("transaction-authorization", "wallet", "Transaction Authorization", "How a user would approve a transaction.", [
  p("Authorization means the wallet asks the user to sign a specific transaction or typed message. The application should show the destination, the network, the asset, and the amount before the wallet opens."),
  p("A signature on a message is not the same as a transaction. The interface should say which one is being requested."),
]);
feature("transaction-lifecycle", "wallet", "Transaction Lifecycle", "From draft to confirmation.", [
  table(["Step", "What happens", "Where"], [
    ["Draft", "The application prepares the action", "Off-chain"],
    ["Review", "The user reads the details", "Application and wallet"],
    ["Sign", "The wallet signs", "User wallet"],
    ["Submit", "The signed transaction is broadcast", "Ethereum or Base"],
    ["Confirm", "The network includes it", "Public chain"],
    ["Display", "The application shows success or failure", "Off-chain view of public data"],
  ]),
  p("This lifecycle is a teaching model. There is no broadcaster in this repository."),
]);
feature("wallet-security", "wallet", "Wallet Security Principles", "Rules for a wallet experience that does not exist yet.", [
  callout(concept),
  ul(["Never ask a user to paste a seed phrase into an EraX website.", "Treat a connection and a transaction as separate approvals.", "Show the network name before signing.", "Expect phishing sites to copy the interface. The wallet prompt is the source of truth for what will be signed.", "Do not claim insurance, audits, or recovery of lost keys."]),
]);
feature("user-responsibilities", "wallet", "User Responsibilities", "What remains the user's responsibility.", [
  p("If the user holds their own keys, loss of the recovery phrase means loss of control. EraX Digital cannot reverse a confirmed blockchain transaction. Users are responsible for checking the address, the network, and the amount in the wallet prompt."),
  p("This page is not a custodial promise and not legal advice."),
]);
feature("supported-networks", "wallet", "Supported Networks", "The only networks named as targets.", [
  table(["Network", "Role", "Status"], [
    ["Ethereum Mainnet", "Planned primary network for ownership and settlement", "Target network"],
    ["Base", "Planned Layer 2 for everyday transactions and creator payments", "Target network"],
  ]),
  p("Other networks, including any bridge, are outside the current product direction."),
]);

feature("creator-overview", "creator", "Creator Economy Overview", "The planned creator product.", [
  p("EraX Creator is a planned creator platform for profiles, content management, subscriptions, paid content, tipping, and creator monetization. It is not available, and it does not promise income."),
  p("Creators would use EraX Social for distribution and EraX Creator for the commercial terms of a post, membership, or tip."),
]);
feature("creator-profiles", "creator", "Creator Profiles", "A public creator presence.", [
  p("A creator profile is a planned extension of a user profile: what the person makes, how to pay them, and which posts are free or paid. Prices must be visible before purchase. No creator is onboarded through this website."),
]);
feature("content-management", "creator", "Content Management", "Drafts, publishing, and paid access.", [
  p("Content management means drafting, publishing, updating, and withdrawing a post. Paid access is a rule on a post, not a different kind of social object. The underlying storage and entitlement checks are not built in this repository."),
]);
feature("paid-content", "creator", "Paid Content", "Charging for a specific piece of content.", [
  p("Paid content means a post or file that a buyer unlocks after a payment. The payment is a proposed on-chain or payment-processor action. The file itself should not be assumed to live on a public chain."),
  p("There is no checkout on this website."),
]);
feature("subscriptions", "creator", "Subscription Model", "Recurring access as a planned feature.", [
  p("A subscription would grant access for a period in exchange for a recurring payment. Renewal, cancellation, and failed payment behavior must be defined before launch. They are not defined as an implemented billing system today."),
  p("A subscription is not an investment in the creator and not a share of revenue unless a specific, lawful agreement says so. No such agreement is offered here."),
]);
feature("tipping", "creator", "Creator Tipping", "One-off payments.", [
  p("A tip is a voluntary payment from a viewer to a creator. The proposed flow shows the amount and the recipient, then asks the wallet to approve. Tips are not likes. A like does not move value."),
]);
feature("digital-payments", "creator", "Digital Payments", "How value is intended to move.", [
  diagram("creator-pay"),
  p("The intended settlement asset for a first version is Ether, or another asset the product later lists explicitly, on Base. No asset is accepted today because the payment system is not live."),
]);
feature("base-integration", "creator", "Base Integration", "Why creator payments point at Base.", [
  p("Base is the planned network for creator payments and subscriptions because it is an Ethereum Layer 2 suited to smaller, more frequent transactions. Ethereum Mainnet remains the planned network for ownership and settlement cases that justify its cost."),
  p("Integration work — clients, contracts, and indexers — is not present in this repository."),
]);
feature("monetization-architecture", "creator", "Creator Monetization Architecture", "How the pieces are intended to connect.", [
  callout(concept),
  ul(["EraX Social shows the post and whether it is paid.", "EraX Creator holds the price, the access rule, and the creator's payment preferences.", "The wallet collects approval.", "A future contract, if written and reviewed, would record the payment on Base.", "An off-chain entitlement record would tell the application whether to show the content."]),
  code("Conceptual sketch, not a deployed contract", "// No contract is deployed.\n// A future subscription call would be explicit, for example:\n// subscribe(creator, planId) payable\n// The user would see the network, value, and destination before signing."),
]);

[
  ["blockchain-overview", "Blockchain Architecture Overview", "The technology layers and what each is for.", [
    diagram("platform"),
    p("A blockchain records confirmed transactions. It does not, by itself, run a social network. EraX Digital's proposal uses chains for selected ownership and payment records and ordinary databases for social data."),
  ]],
  ["ethereum-mainnet", "Ethereum Mainnet", "The planned Layer 1.", [
    p("Ethereum Mainnet is a public, proof-of-stake Layer 1. Smart contracts deployed there have a persistent address and a public history. Fees vary with demand. EraX Digital has not published a mainnet contract address."),
  ]],
  ["base-network", "Base Network", "The planned Layer 2.", [
    p("Base is an Ethereum Layer 2. Transactions are executed in the Layer 2 environment and inherit their security relationship from Ethereum rather than from a separate EraX chain. EraX Digital does not operate Base."),
  ]],
  ["ethereum-base-relationship", "Ethereum and Base Relationship", "Layer 1 and Layer 2, stated plainly.", [
    diagram("networks"),
    p("Layer 1 is Ethereum, where settlement and the base security model live. Layer 2 is Base, where the application hopes to place frequent user transactions. Moving value between them is a bridge operation. No EraX bridge is offered."),
  ]],
  ["tokenomics", "Tokenomics", "The written ERAX token specification.", [
    p("The proposed allocation is published at /tokenomics. The full FAQ is /docs/erax-tokenomics-faq.pdf. That allocation is an economic plan. It is not vesting code in the contract."),
    table(["Property", "Specification"], [
      ["Contract", "EraXToken"],
      ["Name", "EraX"],
      ["Symbol", "ERAX"],
      ["Standard", "ERC-20"],
      ["Intended network", "Base, an Ethereum Layer 2"],
      ["Language", "Solidity 0.8.34"],
      ["Library", "OpenZeppelin Contracts 5.6.1"],
      ["Decimals", "18"],
      ["Transfer tax", "0%"],
      ["Initial supply", "1,000,000,000 ERAX"],
      ["Raw supply", "1,000,000,000 × 10^18"],
      ["Recipient", "The deployer, once, in the constructor"],
    ]),
    h("What the contract does"),
    p("The constructor sets the name to EraX and the symbol to ERAX, then mints the full supply once to the deployer. There is no public or external mint function and no burn function. Transfers use the standard OpenZeppelin ERC-20 transfer, approve, and transferFrom behavior. A transfer of zero tokens is allowed. An insufficient balance or allowance reverts. An unlimited allowance does not decrease when it is used."),
    h("What the contract does not do"),
    ul(["No owner, access-control role, pause, blacklist, tax, or upgrade path.", "No administrator can mint, burn another holder's tokens, pause transfers, or change balances.", "No chain check inside the contract. The same bytecode can be deployed to a test network or to Base. Deployment has not happened.", "No vesting, staking, governance, sale, or price.", "No recovery of lost tokens."]),
    h("Tests and deployment"),
    p("Project tests check the name, symbol, decimals, supply, recipient, transfers, allowances, and the absence of mint, owner, tax, blacklist, and upgrade functions in the ABI. Tests are not an audit. The deployment module does not contain a wallet or a key and does not deploy the contract. This website does not publish a contract address."),
  ]],
  ["smart-contracts", "Smart Contract Architecture", "What contracts would be responsible for, if they are written.", [
    callout(concept),
    p("The ERAX token contract is written as a fixed-supply ERC-20. It is not deployed and has no published address. A later contract set might record a payment, a subscription, or an ownership event. It should not store private messages or entire media files. Contracts in this design would be small, specific, and reviewed before any deployment."),
    code("Contract sketch", "// There is no contract address.\n// The ERAX token is specified and not deployed.\n// There is no testnet deployment published on this site."),
  ]],
  ["blockchain-transactions", "Blockchain Transactions", "What a transaction is.", [
    p("A transaction is a signed instruction: transfer Ether, call a contract, or approve a token spend. After inclusion, it is public and very hard to reverse. Gas is the fee paid to the network, not a fee invented by EraX Digital."),
  ]],
  ["wallet-connectivity", "Wallet Connectivity", "How an application talks to a wallet.", [
    p("A browser or mobile wallet injects a connection that the application can request. The application cannot sign by itself. This site does not include a wallet SDK, WalletConnect project id, or RPC key."),
    diagram("wallet-flow"),
  ]],
  ["on-chain-off-chain", "On-Chain vs Off-Chain Operations", "Why both exist.", [
    diagram("on-off"),
    p("Off-chain systems can be changed, deleted, and access-controlled. On-chain systems are transparent and costly per write, and they do not forget. The proposal puts social activity off-chain and selected payments on-chain. That split is a design, not a running system."),
    table(["Concern", "Off-chain tendency", "On-chain tendency"], [
      ["Cost per action", "Low", "A gas fee"],
      ["Privacy", "Can be limited", "Public by default"],
      ["Reversal", "Application policy", "Not practical after confirmation"],
      ["Proof", "Depends on the operator", "Public history"],
    ]),
  ]],
  ["indexing", "Blockchain Data and Indexing", "How an application would read chain data.", [
    p("Wallets and applications often read chain state through an RPC provider and read history through an indexer. EraX Digital has not selected or integrated a provider. Any future choice should be named, including what happens if that provider is unavailable."),
  ]],
  ["security-architecture", "Security Architecture", "The security boundaries in the proposed design.", [
    diagram("platform"),
    p("The important boundaries are the wallet signature, the application server, the database, and any future contract. A failure in one should not silently become authority in another. See Security and Privacy for the principles. No audit report is attached to this site."),
  ]],
].forEach(function (item) {
  feature(item[0], "chain", item[1], item[2], item[3], "concept");
});

[
  ["security-philosophy", "Security Philosophy", "Security is a set of boundaries, not a badge.", [
    p("The public principle is to be explicit about what exists. This site does not claim an audit, a certification, a penetration test, a bug-bounty payout history, or a regulatory license."),
    ul(["Minimize what is stored.", "Separate social data from payment approval.", "Make network and amount visible before signing.", "Treat third-party RPCs and indexers as dependencies that can fail."]),
  ]],
  ["smart-contract-security", "Smart Contract Security", "Rules that would apply before any deployment.", [
    callout(concept),
    ul(["Keep contracts small.", "Test the actual code, including failure cases.", "Prefer well-reviewed libraries if a contract is written.", "Do not deploy from documentation examples.", "Publish addresses only after deployment, together with the source that matches them."]),
  ]],
  ["wallet-security-principles", "Wallet Security", "Protecting the approval step.", [
    p("The dangerous moment is the signature. Interfaces should not rush it. Seed phrases are never collected by an EraX web form in this design."),
  ]],
  ["authentication", "Authentication", "Signing in is not the same as signing a transaction.", [
    p("Authentication proves an account session. A wallet signature may later be used as a sign-in method. That choice is not implemented. A session cookie or equivalent would control access to off-chain data and would not, by itself, move funds."),
  ]],
  ["access-control", "Access Control", "Who can see or change what.", [
    p("Access control is the rule set for accounts, profiles, communities, messages, and creator entitlements. The repository does not contain an authorization service. The requirement is that paid content stays hidden until an entitlement exists, and that private messages are not world-readable."),
  ]],
  ["data-protection", "Data Protection", "Handling personal information.", [
    p("The design goal is data minimization. A future service should collect what it needs to operate and should not sell personal data. This sentence is a product principle, not a certification. The legal pages state that full policies are not published as a live customer agreement."),
  ]],
  ["transaction-safety", "Transaction Safety", "Reducing mistakes before broadcast.", [
    ul(["Show recipient, network, asset, and amount.", "Warn when the address has not been used before, if the client can know that.", "Do not bundle an unrelated approval into a social click.", "Show failure clearly when a transaction reverts."]),
  ]],
  ["privacy", "Privacy Considerations", "Public chains and private product data.", [
    p("A wallet address and a confirmed transaction are public. A direct message should not be. Documentation must not promise anonymity. Linking a profile to an address reduces privacy even when the link is voluntary."),
  ]],
  ["risk-management", "Risk Management", "The main risks to name in public.", [
    ul(["Smart-contract bugs, once contracts exist.", "Phishing and wallet-drainer sites.", "RPC or indexer outages.", "User error in approvals.", "Regulatory change around payments and digital assets.", "Over-claiming a feature that is not shipped."]),
  ]],
  ["responsible-disclosure", "Responsible Disclosure", "How to report a problem.", [
    p("There is no public bug-bounty program, reward, response-time guarantee, or security certification. If you identify a potential security vulnerability or security-related issue involving EraX Digital, contact contact@erax.digital with a clear description of the issue. Avoid publicly disclosing vulnerabilities before the team has had an opportunity to investigate."),
  ]],
].forEach(function (item) {
  feature(item[0], "security", item[1], item[2], item[3], "concept");
});

pages.push(page("roadmap", "roadmap", "Development Roadmap", "The plan for 2026, 2027, and 2028.", [
  callout(milestone),
  diagram("roadmap"),
  h("2026 — Foundation and EraX Social"),
  p("Company positioning, product requirements, the Ethereum and Base direction, and the foundational architecture for accounts, data, and wallet connectivity are treated as completed. EraX Social is the current product: accounts, posts, follows, comments, bookmarks, communities, and messages. The ERAX token contract is written, with a fixed supply and no admin controls. It is not deployed, not audited, and not for sale."),
  h("2027 — Wallet, creator tools, and testing"),
  p("Intended work covers the EraX Wallet experience, EraX Creator tools for paid content, subscriptions, and tips, and security testing before any wider release. Token deployment, if it is pursued, would be separate from a sale and is not scheduled. This year is not a public beta date."),
  h("2028 — Ecosystem growth"),
  p("Later work may include broader creator and community tools, wallet capability, and interoperability. EraX Assets remains a future possibility. It is not operational and it is not an investment product. Rewards or staking are not a live program and have no published rate."),
]));

[
  ["developer-overview", "Developer Overview", "What a developer can and cannot take from this site.", [
    p("This repository is a static website. It does not ship an SDK, an API, a contract, or a testnet. Developer pages describe the intended shape of a future system so that later implementation does not contradict the public explanation."),
  ]],
  ["technical-architecture", "Technical Architecture", "The same layered model, written for implementers.", [
    diagram("platform"),
    p("An implementation would need clients, an account service, a social data store, a wallet connection in the client, and only then contracts. Building the client screens first does not create on-chain state."),
  ]],
  ["smart-contract-development", "Smart Contract Development", "Guidance before any code is treated as production.", [
    callout(concept),
    p("If contracts are written, they should be versioned, tested, and reviewed. Documentation examples are not source releases. Do not point a frontend at an address copied from a document unless that address is published with matching source."),
    code("Conceptual interface only", "// Not compiled. Not deployed.\ninterface CreatorPayment {\n  function tip(address creator) external payable;\n}"),
  ]],
  ["ethereum-base-integration", "Ethereum and Base Integration", "What an integration would require.", [
    p("A real integration needs a chosen client library, RPC access, chain identifiers for Ethereum Mainnet and Base, and a decision about who pays gas. None of those choices are configured here. Base remains a Layer 2, not a separate EraX chain."),
  ]],
  ["wallet-integration", "Wallet Integration Concepts", "Connection without pretending a vendor is selected.", [
    p("Typical browser integrations request accounts, then ask for a signature or a transaction. A mobile integration might use a wallet-connect style session. No vendor is selected and no project identifier is published."),
  ]],
  ["api-architecture", "API Architecture Overview", "A future HTTP or RPC API, described only as a shape.", [
    callout(["Planned developer documentation", "There are no public endpoints, API keys, or SDKs."]),
    p("A future API would likely expose profiles, posts, communities, and entitlements. It would not expose private keys. It would not be a shortcut around wallet approval for payments."),
    code("Not a live route", "There is no /api/v1 service behind this website.\nDo not send credentials to an invented host."),
  ]],
  ["event-processing", "Blockchain Event Processing", "Reading logs after a contract exists.", [
    p("Once a contract emits events, an indexer or a custom worker can update the off-chain view of payments and subscriptions. That worker does not exist yet. The application should tolerate a delay between chain confirmation and what the feed shows."),
  ]],
  ["development-environment", "Development Environment", "What this repository actually contains.", [
    p("The website is static HTML, CSS from the existing design, and a small local preview server. There is no Solidity project, no database migration, and no application backend in the tree. A future environment should be documented when it exists, including how to run it locally."),
  ]],
  ["testing-and-security", "Testing and Security", "The bar before a beta.", [
    p("Security testing is part of the 2027 plan: contract tests, security assessment, performance work, and preparation for a possible closed beta. Writing the plan is not the same as finishing the tests. No audit firm is named because none has been engaged in the material published here. Tests of the written ERAX token are not an audit."),
  ]],
  ["developer-faq", "Developer FAQ", "Direct answers for builders.", [
    h("Where is the GitHub SDK?"),
    p("No SDK repository is published from this site."),
    h("What is the contract address?"),
    p("None. The ERAX token is specified and not deployed. Do not use an address from an example."),
    h("Which chain IDs will be used?"),
    p("The intended networks are Ethereum Mainnet and Base. Numeric chain configuration will be documented with the client that uses it, not before."),
    h("Can I list a token?"),
    p("No token listing process exists. EraX Assets is not operational."),
  ]],
].forEach(function (item) {
  feature(item[0], "developer", item[1], item[2], item[3], "concept");
});

pages.push(page("glossary", "reference", "Glossary", "Short definitions used across the documentation and whitepaper.", [
  p("Questions about EraX Digital, its products, supported networks, development status, and future plans are answered on the Frequently Asked Questions page in Getting Started."),
  table(["Term", "Meaning here"], [
    ["Web3", "Software that can use blockchains and user-controlled wallets, not a guarantee of decentralization."],
    ["SocialFi", "Social networking combined with ownership and payments. Not a synonym for a token."],
    ["Blockchain", "A public ledger of confirmed transactions."],
    ["Ethereum", "The Layer 1 network planned for ownership and settlement."],
    ["Base", "An Ethereum Layer 2 planned for everyday transactions. Not a separate Layer 1."],
    ["Layer 2", "A network that executes transactions in relation to Ethereum rather than replacing it."],
    ["Smart contract", "A program at an address on a blockchain. The ERAX token is written and not deployed."],
    ["ERAX", "The specified ERC-20 token: 1,000,000,000 supply, 18 decimals, 0% tax, intended for Base. Not deployed and not for sale."],
    ["Digital wallet", "Software that holds keys and asks the user to approve signatures and transactions."],
    ["Digital identity", "The account, profile, and any voluntarily linked address. They are not the same object."],
    ["On-chain", "Recorded in a blockchain transaction."],
    ["Off-chain", "Stored or processed outside the blockchain, under application rules."],
    ["Tokenization", "Representing a right or asset as a token. EraX Assets is only a future exploration of this idea."],
    ["Creator economy", "Tools for creators to charge for access, subscriptions, and tips."],
    ["Digital ownership", "Control of a record or asset authorized by a wallet, not ownership of every social click."],
    ["Transaction", "A signed blockchain instruction."],
    ["Gas fee", "The network fee for a transaction. It is not an EraX subscription fee."],
    ["Wallet signature", "Cryptographic approval by the key holder. It may sign a message or a transaction."],
    ["Decentralized application", "An application that uses a smart contract and a wallet. The label is not used here unless those parts exist."],
  ]),
]));

const whitepaper = [
  { id: "cover", title: "Cover", blocks: [] },
  { id: "summary", title: "1. Executive Summary", blocks: [
    p(company + " The tagline is Connect. Create. Own."),
    p("This whitepaper describes a proposed SocialFi ecosystem. Social networking, digital identity, wallet connectivity, creator monetization, and blockchain-based ownership are intended to sit in one product family without pretending that every click is a financial transaction."),
    p("Ethereum Mainnet is the planned Layer 1 for ownership and settlement. Base, an Ethereum Layer 2, is the planned network for creator payments, subscriptions, and other everyday transactions. Base is not described as an independent Layer 1."),
    p("EraX Social is the current social product. EraX Wallet and EraX Creator are planned. EraX Assets is a future possibility and is not operational. The public plan runs from 2026 through 2028. The ERAX token is specified and is not deployed, audited, or offered for sale."),
    p("Readers should treat diagrams in this document as conceptual. A box in a diagram is a responsibility the design assigns, not a server, contract, or vendor that has been deployed. Where a choice is still open — custody model, RPC provider, indexer, sign-in protocol, media storage — the text says so."),
  ]},
  { id: "introduction", title: "2. Introduction", blocks: [
    p("Digital communities already exist inside large social platforms. Those platforms proved that people will publish, follow, and gather around creators. They also concentrated distribution, identity, and monetization in accounts that the platform can limit or remove."),
    p("Blockchains added a different primitive: a user can hold keys and authorize a transaction that does not depend on a single application database. Wallets, fees, and unfamiliar signing prompts made that primitive hard to use. Most people do not want a lesson in gas in order to read a post."),
    p("Creators, meanwhile, are asked to assemble a separate stack for audience, membership, and payment. The pieces work, but they do not feel like one product."),
    p("EraX Digital's proposal is to keep the social experience familiar and to introduce wallet authorization only where ownership or payment is actually happening. EraX Social is available for accounts, posts, follows, comments, bookmarks, communities, and messages. Wallet, creator payments, and the token are not claimed beyond the limits in this paper."),
    h("How to read the status language"),
    p("2026 means foundation work that the company treats as done, plus the current EraX Social product. 2027 means intended wallet, creator, and testing work, not a dated public beta. 2028 means later ecosystem work, not a committed release."),
    p("The long-term vision is a connected digital world where people, communities, and digital assets can interact, create value, and grow together. The practical mission is narrower: make Web3 easier to approach by keeping social software, ownership, and payment in one understandable system, and by refusing to describe unfinished work as finished."),
  ]},
  { id: "problem", title: "3. Problem Statement", blocks: [
    p("The following are industry problems and design objectives. They are not findings from a private dataset and they are not accusations against a named competitor."),
    h("Fragmented digital experiences"),
    p("A person who wants to publish, talk to an audience, hold a wallet, and get paid often crosses several products. Each product has its own account, its own idea of identity, and its own failure mode. The design objective is one journey, not a claim that every existing product is unusable."),
    h("Limited user ownership"),
    p("An audience, a profile, and a catalog of work can sit entirely inside an account the operator controls. Digital ownership, in the sense used here, is the ability to authorize selected records with a wallet the person controls. It is not a claim that a social graph can or should be moved on-chain in full."),
    h("Dependence on a single operator"),
    p("Distribution and identity on a conventional social platform depend on that platform remaining willing and able to serve the account. A wallet address is a second kind of identifier. Using it does not remove the need for an application operator. It does mean that a payment or an ownership record can outlive a single screen."),
    h("Limited creator monetization"),
    p("Creators are often limited to the commercial formats a host already sells. The design objective for EraX Creator is a small, explicit set: paid access to an item, a subscription for a period, and a voluntary tip. That set is planned. It is not a marketplace that exists today, and it is not a promise of income."),
    h("Complex wallet experiences"),
    p("Wallets ask people to choose a network, pay a fee, and approve a payload they may not understand. Those prompts are appropriate for moving value. They are a poor requirement for reading a feed. The design objective is to show a wallet only when the action needs one, and to show the network, destination, and amount before the person signs."),
    h("Barriers to mainstream use"),
    p("Web3 products sometimes teach the protocol before they offer a familiar task. EraX Digital's objective is the reverse order: a social task first, a wallet decision only when ownership or payment is the task. This is a product requirement for later implementation, not a usability study with published results."),
  ]},
  { id: "solution", title: "4. EraX Digital's Proposed Solution", blocks: [
    callout(concept),
    p("The proposed ecosystem has five working ideas. Social networking gives people a place to publish and gather. Digital identity separates an account, a profile, and an optional wallet address. Wallet connectivity makes payment and ownership explicit. Creator monetization adds prices, subscriptions, and tips. Blockchain-based ownership is reserved for the records that benefit from a public transaction."),
    p("These parts are intended to feel like one journey. A person can join, post, and talk without a chain write. The same person can connect a wallet when they decide to pay or to show an address. The documentation for each product states the same boundary."),
    h("A single journey, stated as steps"),
    ul(["The person creates an account and a profile. This step is off-chain and does not require a wallet.", "The person publishes and responds inside EraX Social. Likes, comments, and messages are social actions, not transfers.", "The person connects a wallet only to show an address or to approve a payment. Connection is not permission to move funds.", "A paid post, subscription, or tip is reviewed in EraX Creator, then signed in the wallet, with Base as the intended network.", "EraX Assets is not on this path. Issuance and tokenization remain future exploration."]),
    p("Account creation, posting, comments, communities, and messages are available in EraX Social. Paid posts, subscriptions, tips, and EraX Assets are not. The later steps are the product definition for 2027 and 2028."),
    diagram("ecosystem"),
  ]},
  { id: "architecture", title: "5. Ecosystem Architecture", blocks: [
    callout(concept),
    diagram("platform"),
    h("User experience layer"),
    p("Screens for reading, posting, connecting, and paying. This layer explains actions. It does not hold keys."),
    h("Social application layer"),
    p("Feeds, communities, messaging, and publishing rules."),
    h("Identity and authentication layer"),
    p("Accounts, sessions, and permissions. A future wallet sign-in would live here and would still be distinct from a payment signature."),
    h("Wallet integration layer"),
    p("Requests to an external wallet, display of an address, and handoff of a transaction for approval."),
    h("Backend and data layer"),
    p("Off-chain storage for profiles, posts, messages, and settings. This layer is not deployed in the website repository."),
    h("Smart contract layer"),
    p("The ERAX token contract is written as a fixed-supply ERC-20 and is not deployed. Later programs for selected payments and ownership events are still future work."),
    h("Blockchain network layer"),
    p("Base for frequent transactions and Ethereum Mainnet for settlement and ownership cases that justify Layer 1 cost."),
    h("How the layers are allowed to call each other"),
    p("The experience layer may ask the social layer for a feed and the wallet layer for an approval. It must not hold keys, and it must not invent a transaction the user did not review. The social layer may store posts and messages. It must not treat a like as a payment. The identity layer may open a session. A session is not a signature that moves value. The wallet layer may request an account and a signature from software the user already controls. A future contract may record a payment the wallet has signed. It should not be the database for private messages or media files."),
    p("The backend and data layer is the part a conventional application would run: accounts, posts, permissions, and files. This website repository does not contain that service. Naming the layer is not evidence that it is online."),
  ]},
  { id: "products", title: "6. Product Architecture", blocks: [
    h("EraX Social"),
    p("The current social product, at https://erax-digital.vercel.app/, for accounts, posts, follows, comments, bookmarks, communities, and messages. Optional wallet sign-in can use an Ethereum or Solana signature. Creator subscriptions and on-chain payments are not in this build."),
    diagram("social-flow"),
    h("EraX Wallet"),
    p("A planned wallet experience for Ethereum and Base connectivity, digital asset visibility, and transaction authorization. The company does not claim a custodial or a non-custodial service until the implementation exists and is documented."),
    diagram("wallet-flow"),
    h("EraX Creator"),
    p("A planned creator platform for profiles, content management, subscriptions, paid content, tipping, and creator payments."),
    diagram("creator-pay"),
    h("EraX Assets"),
    p("A potential future product focused on digital asset issuance and tokenization. It is not currently operational. It is not an investment product and it is not part of the current build sequence as a shipped service."),
    h("Boundaries between the products"),
    p("EraX Social owns the conversation: who posted, who replied, and which community the post belongs to. EraX Wallet owns the approval: which address, which network, and which payload the user agreed to sign. EraX Creator owns the commercial term: the price, the period, and whether access was granted. A screen may show all three, but the responsibilities stay separate so that a social click cannot hide a payment."),
    p("Four wallet words are easy to collapse, and this document does not collapse them. A connected external wallet is software the user already controls; the application requests a connection. A wallet interface is the set of screens that explain and display that request. A custodial wallet is a service that holds keys for the user. A non-custodial wallet is one where the user holds the keys. EraX Digital does not claim to operate either custody model. The planned work is an interface to a wallet the user brings, and even that interface is not shipped."),
  ]},
  { id: "blockchain", title: "7. Blockchain Strategy", blocks: [
    diagram("networks"),
    h("Ethereum Mainnet"),
    p("Ethereum is the planned primary network. It is the Layer 1 reference for ownership, important contract operations, and settlement where the cost is acceptable. EraX Digital does not run Ethereum validators and does not publish a client diversity or staking operation."),
    h("Base"),
    p("Base is the planned Layer 2 for consumer transactions, creator payments, and subscriptions. Users would still approve transactions in a wallet and pay gas. Calling Base a Layer 2 is deliberate: it is not a new base chain owned by the company."),
    h("Layer 1, Layer 2, and fees"),
    p("A Layer 1 transaction is executed and settled on Ethereum Mainnet. A Layer 2 transaction is executed in Base's environment and relies on Ethereum for its security relationship. Users still sign, and they still pay gas. Gas is the network fee, priced by demand on that network. It is not a subscription invented by EraX Digital. Placing everyday creator payments on Base is a cost and latency choice. It does not create a company chain, and it does not make Base a Layer 1."),
    h("Wallet connectivity and contract calls"),
    p("An application prepares a transaction. The wallet displays it. The user signs or refuses. Only a signed transaction can be broadcast. A contract call, once a contract exists, is still just a transaction with data: the contract address, the function, and the arguments. No EraX contract address is published because no project contract is deployed from this repository. Examples in the developer documentation are labeled as sketches and must not be treated as source releases."),
    h("What an integration must explain"),
    ul(["Which chain a transaction uses.", "Who pays gas.", "What a contract call does, once a contract exists.", "How a user would move value between Base and Ethereum, using existing network bridges rather than an unannounced EraX bridge.", "That no RPC provider has been selected in this repository."]),
    p("Interoperability, for the current strategy, means Ethereum and Base only. Moving value between them is a bridge operation provided by the networks' own infrastructure. EraX Digital does not offer a bridge, a wrapped asset, or a third network."),
  ]},
  { id: "split", title: "8. On-Chain and Off-Chain Architecture", blocks: [
    callout(concept),
    diagram("on-off"),
    p("Off-chain candidates are social feeds, likes, comments, messaging, discovery, and interface preferences. They benefit from low cost, ordinary access control, and the ability to remove abusive content."),
    p("On-chain candidates are wallet authorization, selected payments, creator subscriptions, and ownership records that should have a public history. They cost gas, they are public, and they are difficult to reverse."),
    table(["Trade-off", "Off-chain", "On-chain"], [
      ["Scalability", "Application capacity", "Network throughput and fees"],
      ["User experience", "Instant for local reads", "Waiting for inclusion"],
      ["Transparency", "Depends on the operator", "Public verification"],
      ["Privacy", "Can be restricted", "Public by default"],
    ]),
    p("This split is a proposal. It should be revised if the implementation chooses a different boundary."),
    h("Why social activity stays off-chain"),
    p("A feed is read far more often than it is written, and a comment is not a transfer of value. Putting those writes on a public chain would charge a fee, publish the content to anyone who reads the chain, and make ordinary moderation much harder. Off-chain storage can be access-controlled, cached, and removed when a post breaks a rule. The operator of that storage is a point of trust. The document does not pretend otherwise."),
    h("Why selected payments go on-chain"),
    p("A payment, a subscription receipt, or an ownership record is more useful if the user can see that a wallet authorized it and that the network included it. That history is public and difficult to reverse. The application can show a friendlier status, but the chain remains the record of the transfer. Media files and message bodies do not need that property, so they stay off the chain even when a payment unlocks them."),
  ]},
  { id: "creator-model", title: "9. Creator Economy Model", blocks: [
    p("A creator participates by publishing work and, optionally, setting a price. Viewers can read free work, pay for an item, subscribe, or tip. Community discussion stays in the social product. The commercial term is visible before anyone pays."),
    ul(["Paid access unlocks a specific item.", "A subscription is recurring access for a stated period.", "A tip is voluntary and separate from a like.", "Settlement is intended on Base.", "The creator model does not require the ERAX token. The token is specified and is not deployed or for sale.", "Income is not guaranteed."]),
    h("Participation and content"),
    p("A creator is an account with a public profile and a body of work. Free posts can circulate in EraX Social like any other post. A paid post carries a visible price and an access rule. The file or text that is being sold should be stored off-chain. What may later be recorded on Base is the payment, not the file."),
    h("Subscriptions, tips, and community"),
    p("A subscription is access for a stated period in exchange for a recurring payment. Renewal, cancellation, and a failed payment have to be defined before anyone is charged. They are not defined as a billing system today. A tip is a one-off payment and must not be implied by a like. Community discussion — replies, membership, conversation — stays a social function. Payment-gated communities, if they are offered later, have to show the price before a person joins."),
    p("Creator payments are intended to settle on Base because they are smaller and more frequent than the ownership events reserved for Ethereum Mainnet. No asset is accepted today. No creator is onboarded through this website. This model does not require the ERAX token, a staking rate, or a revenue share. The token is specified separately and is not for sale."),
    diagram("creator-pay"),
  ]},
  { id: "security", title: "10. Security Architecture", blocks: [
    p("Security work that is real today is the decision to avoid false claims. The website repository has no authentication service, no key store, and no contract to audit."),
    h("Planned measures, not verified controls"),
    ul(["Smart-contract review before any deployment.", "Wallet prompts that show network, destination, and value.", "Separation between session authentication and transaction authorization.", "Server-side checks on a future API, with no public API today.", "Validation that a submitted transaction matches what the user was shown.", "Least-privilege access to personal data.", "Monitoring and an incident process once a service exists.", "Threat modeling for phishing, malicious approvals, and dependency failure."]),
    p("No audit firm, certificate, or penetration-test report is cited because none is published here."),
    h("What each measure is for"),
    p("Contract review matters only after code exists. Until then, the control is to refuse unpublished addresses and to keep examples out of any client configuration. Wallet prompts matter because the signature is the moment value can move. The application should show the network, the destination, and the amount, and the wallet prompt remains the source of truth for what will be signed. A seed phrase is never collected by an EraX web form in this design."),
    p("Authentication opens a session for off-chain data. Authorization of a transaction is a separate signature. Mixing them would let a sign-in become a payment. A future API would check entitlements on the server. There is no public API to call. Transaction validation means the broadcast payload matches the payload the user was shown. Data protection means collecting less personal data and limiting who can read it. Monitoring, incident response, and threat modeling are operating practices for a service that does not yet exist. They are listed so the later build has a scope, not so they can be cited as current controls."),
  ]},
  { id: "privacy", title: "11. Privacy and Data Management", blocks: [
    p("A future service would handle account data, profile content, social posts, and optionally a wallet address. Blockchain data is public once a transaction is submitted. The design goal is to keep private correspondence and personal data off-chain and to collect less rather than more."),
    h("Categories of data"),
    p("Account data is what a future service needs to recognize a person and recover access. Profile and social content is what the person chooses to show. Direct messages are private correspondence and are a poor fit for a public chain. A wallet address is already public on Ethereum and Base once it has activity. Linking that address to a profile is an additional choice and should be visible to the person who makes it."),
    p("Data minimization means not collecting a field because it might be useful later. Access control means unpaid content and private messages are not world-readable. Retention has to be stated when a service actually stores data. This paper does not invent a retention schedule. Public blockchain data cannot be deleted by an application after it is confirmed. That limit should be said in the product, not only in a policy."),
    p("The design does not promise anonymity, complete privacy, or the ability to hide a transaction that has already been included. Legal pages on the website state the current limits of published policy. This section does not replace them and does not claim a certification."),
  ]},
  { id: "scale", title: "12. Scalability and Performance", blocks: [
    callout(concept),
    p("The proposed performance strategy is mostly a consequence of the on-chain boundary. Frequent social reads stay off-chain. Payments that need a chain use Base rather than forcing every action onto Ethereum Mainnet."),
    ul(["Layer 2 execution for suitable transactions.", "Off-chain social data.", "Caching of public reads.", "Asynchronous jobs for notifications and indexing.", "A conventional database for product data, once a backend exists.", "Event-driven updates from chain logs, once contracts exist.", "An indexer or equivalent, not yet chosen.", "Measurement before any capacity claim."]),
    p("None of these components are deployed from this site. They are architecture considerations."),
    h("What each consideration is trying to avoid"),
    p("Layer 2 execution is how suitable payments avoid the cost of a Layer 1 write. Off-chain social data is how the feed avoids that cost entirely. Caching is how repeated reads of public posts avoid hitting the primary store. Asynchronous jobs are how notifications and indexing happen after the user has already seen a response. A conventional database is the expected store for product data once a backend exists. Event-driven updates are how a confirmed payment would eventually change an entitlement. An indexer is how the application would read chain history without scanning it from the client. None of these has been selected or deployed here."),
    p("Performance numbers are not published because there is no service to measure. A later beta should measure latency, failed transactions, and feed load before anyone describes the system as scalable."),
  ]},
  { id: "roadmap-wp", title: "13. Development Roadmap", blocks: [
    diagram("roadmap"),
    table(["Year", "Focus", "Status", "Objective"], [
      ["2026", "Foundation and EraX Social", "In progress as the current year", "Completed foundation and the current social product. Token specified, not deployed."],
      ["2027", "Wallet, creator tools, and testing", "Planned", "Wallet experience, creator payments, and security testing. Not a sale and not a dated beta."],
      ["2028", "Ecosystem growth", "Future development", "Broader tools. EraX Assets remains not operational."],
    ]),
    h("What each year is for"),
    p("2026 covers the company's product vision, independent positioning, the Ethereum and Base direction, and the foundational architecture for accounts, data, and wallet connectivity. EraX Social is available for accounts, posts, follows, comments, bookmarks, communities, and messages. The ERAX token is a written ERC-20 with a fixed supply of 1,000,000,000, 18 decimals, and no transfer tax. It has no admin mint, burn, pause, or upgrade path. It is not deployed and it is not for sale. The proposed allocation is published at /tokenomics. The full FAQ is /docs/erax-tokenomics-faq.pdf. The allocation is an economic plan. It is not vesting code in the contract."),
    p("2027 is the intended year for the EraX Wallet experience and for EraX Creator: paid content, subscriptions, tips, and payment design on Base. It is also the year for security testing and preparation. It is not an announcement that a public beta has a date, and it is not a token sale."),
    p("2028 is future ecosystem work. It may include further creator and community tools, wallet capability, and interoperability. EraX Assets is not operational and is not an investment product. Rewards or staking are not a live program and have no published rate."),
  ]},
  { id: "risks", title: "14. Risks and Considerations", blocks: [
    ul(["Smart-contract vulnerabilities, if and when contracts are deployed.", "Ethereum and Base network conditions, including congestion and fee spikes.", "Wallet phishing and malicious signature requests.", "Regulatory uncertainty for payments, digital assets, and consumer platforms.", "Privacy loss from public addresses and from linking them to profiles.", "Scalability limits if too much social activity is placed on-chain.", "Adoption risk if wallet prompts are required too early.", "Dependence on RPC providers, indexers, wallets, and the Base and Ethereum networks, none of which EraX Digital controls."]),
    p("These risks are reasons to keep the scope honest. They are not a complete risk register."),
    p("Contract risk appears only when code is deployed. The current mitigation is not to point any interface at an address this document did not publish. Network risk is congestion, reorg behavior within the rules of Ethereum and Base, and fee spikes. The user pays those fees. Wallet risk is mostly phishing: a site that imitates the interface and a signature that does more than the person thinks. The wallet prompt has to be readable, and a seed phrase has to stay out of the website."),
    p("Regulatory risk is real for payments and digital assets and is not solved by a product diagram. Privacy risk grows when a public address is linked to a name. Scalability risk returns if social writes are moved on-chain to look more decentralized. Adoption risk returns if a wallet is required before a person can read. Third-party risk covers RPC providers, indexers, wallet vendors, and the networks themselves. EraX Digital does not operate those dependencies and has not selected the providers."),
  ]},
  { id: "future", title: "15. Future Development", blocks: [
    callout(future),
    p("2028 collects ideas that are not in the current build: advanced creator and community tools, further wallet features, rewards or staking, cross-chain interoperability, digital-asset tokenization, and integrations. Publishing the list is not a release commitment. Rewards, if ever considered, would need their own explanation and would not be described as a yield."),
    ul(["Advanced creator tools would extend content management after the basic paid, subscription, and tip model exists.", "Additional wallet capabilities might include clearer portfolio views or more networks. No additional network is named.", "Rewards or staking are not a live program, have no published rate, and are not part of the creator payment model.", "Cross-chain interoperability beyond Ethereum and Base is not designed.", "Digital-asset tokenization is the subject of EraX Assets and remains future exploration.", "Ecosystem integrations with other products are not partnerships. None are announced."]),
  ]},
  { id: "conclusion", title: "16. Conclusion", blocks: [
    p("EraX Digital is proposing a connected SocialFi ecosystem: familiar social software, explicit wallet approval, creator payments, and a narrow use of Ethereum and Base. The website states what is planned and what is only a future possibility. The useful next proof is implementation, not a broader claim."),
    p("Connect. Create. Own. remains the short form of that proposal."),
  ]},
  { id: "disclaimer", title: "17. Disclaimer", blocks: [
    p("This whitepaper is provided for informational purposes only. It describes the current vision, proposed architecture, and intended development direction of EraX Digital. Certain features and technical components remain under development or are planned for future consideration. This document does not constitute an offer to sell securities, tokens, or other financial instruments, nor does it guarantee future functionality, performance, financial returns, or product availability. Technical specifications and development priorities may evolve."),
  ]},
];

function textOf(blocks) {
  return blocks.map(function (block) {
    if (block.type === "p" || block.type === "h2" || block.type === "callout") return block.text || "";
    if (block.type === "ul") return block.items.join(" ");
    if (block.type === "table") return block.rows.map(function (row) { return row.join(" "); }).join(" ");
    if (block.type === "code") return block.text;
    return "";
  }).join(" ");
}

function slugify(text) {
  return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";
}

function renderBlocks(blocks) {
  const used = {};
  function hid(text) {
    const base = slugify(text);
    let id = base;
    let n = 2;
    while (used[id]) {
      id = base + "-" + n;
      n += 1;
    }
    used[id] = true;
    return id;
  }
  return blocks.map(function (block) {
    if (block.type === "p") return "<p>" + esc(block.text) + "</p>";
    if (block.type === "h2") return '<h2 id="' + hid(block.text) + '">' + esc(block.text) + "</h2>";
    if (block.type === "h3") return '<h3 id="' + hid(block.text) + '">' + esc(block.text) + "</h3>";
    if (block.type === "callout") return '<aside class="docs-callout"><strong>' + esc(block.label) + "</strong><p>" + esc(block.text) + "</p></aside>";
    if (block.type === "ul") return "<ul>" + block.items.map(function (item) { return "<li>" + esc(item) + "</li>"; }).join("") + "</ul>";
    if (block.type === "table") {
      return '<table class="docs-table"><thead><tr>' + block.headers.map(function (header) { return "<th>" + esc(header) + "</th>"; }).join("") + "</tr></thead><tbody>" +
        block.rows.map(function (row) { return "<tr>" + row.map(function (cell) { return "<td>" + esc(cell) + "</td>"; }).join("") + "</tr>"; }).join("") +
        "</tbody></table>";
    }
    if (block.type === "diagram") return diagrams.render(block.id);
    if (block.type === "code") return '<div class="docs-code-label">' + esc(block.label) + '</div><pre class="docs-code">' + esc(block.text) + "</pre>";
    return "";
  }).join("");
}

module.exports = {
  categories,
  pages,
  whitepaper,
  company,
  esc,
  textOf,
  renderBlocks,
  diagrams,
};

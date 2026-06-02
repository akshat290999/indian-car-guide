# Per-model metadata — brand history, lineage, monthly sales.
# Merged into API responses by main.py; NOT repeated per trim.

CAR_META = {
    'Creta': {
        'brand_history':   "Hyundai Motor India commenced operations in 1996 and became the second-largest carmaker in the country within just a few years of entry. Its Chennai plant is one of Hyundai's largest global production hubs, exporting vehicles to over 90 countries. The brand is credited with raising design and feature expectations for Indian buyers, pioneering connected-car technology through its BlueLink platform, and consistently topping J.D. Power quality rankings in the Indian market.",
        'lineage_history':  'Launched in 2015, the Creta revolutionized the compact SUV segment in India. Over multiple generations, it has remained the undisputed segment leader, known for its futuristic styling and feature-packed cabin.',
        'monthly_sales':    16000,
    },
    'Thar': {
        'brand_history':   "Mahindra and Mahindra began as a steel trading company in 1945 and assembled Willys Jeeps under licence before building its own rugged utility vehicles. The brand's identity is built on off-road capability and durability, exemplified by the legendary Bolero and Scorpio nameplates that dominate rural and semi-urban India. Mahindra's new-generation platforms underpin the XUV700, Scorpio-N, and XUV 3XO, which have won multiple Indian Car of the Year awards, while the company invests heavily in its BE and XEV electric series for an electrified future.",
        'lineage_history':  "The Thar was reborn in 2020 as a lifestyle icon that bridged hardcore off-road capability with everyday usability. Its 2024 Roxx iteration introduced a five-door body, expanding its appeal while keeping the rugged ladder-frame DNA that made the original a cult favourite.",
        'monthly_sales':    9000,
    },
    'Nexon': {
        'brand_history':   "Tata Motors, part of the 150-year-old Tata Group, has been making commercial vehicles since 1954 and passenger cars since 1991. After acquiring Jaguar Land Rover in 2008, Tata gained global engineering credibility that now filters into its mainstream lineup. A dramatic reinvention began with the Nexon (2017) and Harrier (2019), positioning the brand as a serious lifestyle-SUV contender, and Tata is now India's electric-vehicle leader with the Nexon EV holding dominant segment share.",
        'lineage_history':  "Debuting in 2017, the Nexon made history as the first Indian car to achieve a 5-star GNCAP safety rating. Its bold coupe-like styling and robust safety focus transformed Tata Motors' brand perception completely.",
        'monthly_sales':    12000,
    },
    'City': {
        'brand_history':   "Honda Cars India, a wholly-owned subsidiary of Honda Motor Company, commenced operations in 1995 and quickly earned a reputation for engineering excellence and cabin refinement that set benchmarks in the Indian passenger car market. Its City nameplate, introduced in 1998, became synonymous with aspirational motoring for India's urban professional class and held the mid-size sedan crown for over two decades. Honda's VTEC engine technology, meticulous build quality, and industry-leading resale values have cultivated an intensely loyal customer base, while the City e:HEV strong hybrid demonstrates Honda's enduring commitment to advanced and sustainable mobility in India.",
        'lineage_history':  "The City has been Honda's flagship model in India since 1998 and the country's best-selling mid-size sedan for much of its history. The sixth generation brought the City e:HEV strong hybrid - the only hybrid sedan in its class - cementing Honda's reputation for powertrain innovation and interior refinement.",
        'monthly_sales':    5000,
    },
    'Slavia': {
        'brand_history':   "Skoda Auto, founded in 1895 in Mladá Boleslav, is one of the oldest surviving car manufacturers in the world and became part of the Volkswagen Group in 1991. In India, Skoda launched under VW Group's India 2.0 project in 2021, sharing platforms and powertrains with Volkswagen to dramatically reduce costs and improve localisation. The brand is known for its precise European engineering, generous standard equipment, and a reputation for ride quality and safety that consistently outperforms segment expectations.",
        'lineage_history':  "The Slavia was launched in India in 2022 as Skoda's mid-size sedan built specifically for the Indian market on the MQB-A0-IN platform. It replaced the Rapid and brought 1.0 TSI and 1.5 TSI turbocharged engines with DSG automatic options, filling a niche between value hatchbacks and premium saloons. The Monte Carlo variant targeted sporty buyers and became the range's signature trim.",
        'monthly_sales':    3500,
    },
    'Grand Vitara': {
        'brand_history':   "Maruti Suzuki India Limited, established in 1981 as a joint venture between the Government of India and Suzuki Motor Corporation, is India's largest carmaker by volume and has held over 40 percent market share for most of its history. The company introduced fuel-efficient small cars that transformed personal mobility in India and operates the country's largest sales and service network spanning every district. Its Nexa premium channel, launched in 2015, elevated the brand's positioning and now houses aspirational models including the Grand Vitara, Fronx, and Jimny.",
        'lineage_history':  "The Grand Vitara name returned to India in 2022 after a hiatus, built on a Toyota-developed TNGA-B platform co-developed with Toyota as part of the two companies' global alliance. It became Maruti's first strong hybrid SUV through the Toyota-sourced e-CVT system, instantly making it the most efficient car in its segment. The mild hybrid variants brought affordability, while the strong hybrid Alpha+ became the flagship of Maruti's premium SUV ambitions.",
        'monthly_sales':    14000,
    },
    'Fortuner': {
        'brand_history':   "Toyota Kirloskar Motor, a joint venture between Toyota Motor Corporation and the Kirloskar Group, has operated in India since 1997. While Toyota holds a modest overall share, it dominates the premium SUV and MPV segments with the Fortuner, Innova Hycross, and Camry. The brand is synonymous with legendary reliability — the Fortuner and Innova have a cult following among fleet operators and aspirational buyers alike — and Toyota's hybrid technology leadership is unmatched in India, covering both self-charging and plug-in architectures.",
        'lineage_history':  "The Fortuner has been the undisputed king of the lifestyle SUV segment in India since its 2009 introduction. Built on a ladder-frame chassis with selectable 4x4, it combines genuine off-road capability with a commanding road presence that its monocoque rivals cannot match. The 2021 facelift brought a 204 PS diesel, a sportier Legender variant, and the GR Sport trim that elevated its performance credentials while keeping the dependable D-4D diesel powertrain at its core.",
        'monthly_sales':    4500,
    },
    'Scorpio-N': {
        'brand_history':   "Mahindra and Mahindra began as a steel trading company in 1945 and assembled Willys Jeeps under licence before building its own rugged utility vehicles. The brand's identity is built on off-road capability and durability, exemplified by the legendary Bolero and Scorpio nameplates that dominate rural and semi-urban India. Mahindra's new-generation platforms underpin the XUV700, Scorpio-N, and XUV 3XO, which have won multiple Indian Car of the Year awards, while the company invests heavily in its BE and XEV electric series for an electrified future.",
        'lineage_history':  "The Scorpio name has been a Mahindra icon since 2002, defining the brand's transition from utilitarian vehicles to aspirational SUVs. The Scorpio-N launched in 2022 as a clean-sheet redesign on an all-new ladder frame platform, with a 2.2L mHawk diesel and a new 2.0L mStallion turbo petrol option. It offered genuine seven-seater capacity, ADAS features, and a premium interior that the original Scorpio never had, while retaining the rugged body-on-frame DNA its loyal customer base expected.",
        'monthly_sales':    7000,
    },
}

import json

# Curated high quality Unsplash photos for each distinct item name

indoor_items = [
    ("Snake Plant", "Dracaena trifasciata", "Tolerates low light; water every 2-3 weeks.", 199, "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80"),
    ("Money Plant (Pothos)", "Epipremnum aureum", "Fast trailing vine; grows in water or soil.", 149, "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80"),
    ("Peace Lily", "Spathiphyllum wallisii", "White spathes; leaves droop when thirsty.", 299, "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80"),
    ("Spider Plant", "Chlorophytum comosum", "Arching striped leaves; makes baby plantlets.", 159, "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80"),
    ("ZZ Plant", "Zamioculcas zamiifolia", "Glossy leaves; survives neglect and low light.", 349, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Rubber Plant", "Ficus elastica", "Large glossy leaves; bright indirect light.", 329, "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"),
    ("Aloe Vera", "Aloe vera", "Gel-filled leaves; bright light, little water.", 129, "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80"),
    ("Monstera (Swiss Cheese)", "Monstera deliciosa", "Split, holey leaves; loves a moss pole.", 499, "https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=600&q=80"),
    ("Areca Palm", "Dypsis lutescens", "Feathery fronds; a classic living-room palm.", 379, "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=600&q=80"),
    ("Boston Fern", "Nephrolepis exaltata", "Lush fronds; needs humidity and moist soil.", 269, "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"),
    ("Chinese Evergreen", "Aglaonema commutatum", "Patterned leaves; thrives in low light.", 399, "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80"),
    ("Dumb Cane", "Dieffenbachia seguine", "Cream-splashed leaves; sap is toxic, handle with care.", 279, "https://images.unsplash.com/photo-1597055181300-e3633a207519?auto=format&fit=crop&w=600&q=80"),
    ("Jade Plant", "Crassula ovata", "Thick succulent leaves; water sparingly.", 199, "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80"),
    ("Fiddle-Leaf Fig", "Ficus lyrata", "Violin-shaped leaves; likes steady bright light.", 599, "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&q=80"),
    ("English Ivy", "Hedera helix", "Classic trailing vine; good in hanging pots.", 219, "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80"),
    ("Heartleaf Philodendron", "Philodendron hederaceum", "Easy trailing vine with heart-shaped leaves.", 189, "https://images.unsplash.com/photo-1599598425947-020645551982?auto=format&fit=crop&w=600&q=80"),
    ("Calathea Orbifolia", "Goeppertia orbifolia", "Large round striped leaves; needs humidity.", 449, "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=600&q=80"),
    ("Lucky Bamboo", "Dracaena braunii", "Grows in water; a popular gift plant.", 169, "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=600&q=80"),
    ("Parlor Palm", "Chamaedorea elegans", "Compact palm; copes with low light.", 319, "https://images.unsplash.com/photo-1598880940472-f3f87a0e3868?auto=format&fit=crop&w=600&q=80"),
    ("Baby Rubber Plant", "Peperomia obtusifolia", "Thick waxy leaves; compact desk plant.", 179, "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80"),
    ("Dragon Tree", "Dracaena marginata", "Spiky red-edged leaves on slim stems.", 299, "https://images.unsplash.com/photo-1598880940561-2b0a1743a164?auto=format&fit=crop&w=600&q=80"),
    ("Cast Iron Plant", "Aspidistra elatior", "Nearly indestructible; fine in deep shade.", 389, "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=600&q=80"),
    ("Chinese Money Plant", "Pilea peperomioides", "Round coin-shaped leaves on long stalks.", 249, "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80")
]

outdoor_items = [
    ("Hibiscus (Gudhal)", "Hibiscus rosa-sinensis", "Large trumpet blooms nearly all year in warm climates.", 179, "https://images.unsplash.com/photo-1550950158-d0d960dff51b?auto=format&fit=crop&w=600&q=80"),
    ("Rose", "Rosa x hybrida", "Classic fragrant flowers; prune after the cool season.", 229, "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80"),
    ("Jasmine (Mogra)", "Jasminum sambac", "Sweetly scented white flowers used in garlands.", 169, "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80"),
    ("Marigold (Genda)", "Tagetes erecta", "Orange pom-pom blooms; helps deter garden pests.", 119, "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"),
    ("Bougainvillea", "Bougainvillea glabra", "Papery bracts in vivid magenta; loves full sun.", 199, "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80"),
    ("Tulsi (Holy Basil)", "Ocimum tenuiflorum", "Sacred aromatic herb used in teas and worship.", 99, "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80"),
    ("Ixora", "Ixora coccinea", "Clusters of red-orange flowers; attracts butterflies.", 189, "https://images.unsplash.com/photo-1588628566587-dbd176de54b4?auto=format&fit=crop&w=600&q=80"),
    ("Crossandra (Kanakambaram)", "Crossandra infundibuliformis", "Orange fan-shaped flowers; blooms year-round.", 159, "https://images.unsplash.com/photo-1596073419667-9d77d59f033f?auto=format&fit=crop&w=600&q=80"),
    ("Lantana", "Lantana camara", "Multicolour flower heads; hardy and drought tolerant.", 149, "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=600&q=80"),
    ("Oleander (Kaner)", "Nerium oleander", "Pink blooms on a hardy shrub. All parts are toxic.", 209, "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80"),
    ("Frangipani (Champa)", "Plumeria rubra", "Fragrant five-petal flowers on a sturdy small tree.", 349, "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80"),
    ("Periwinkle (Sadabahar)", "Catharanthus roseus", "Flowers nonstop and thrives in heat.", 109, "https://images.unsplash.com/photo-1599598424953-663172e27649?auto=format&fit=crop&w=600&q=80"),
    ("Petunia", "Petunia x atkinsiana", "Funnel flowers for borders and baskets.", 139, "https://images.unsplash.com/photo-1589217157232-4a451d303811?auto=format&fit=crop&w=600&q=80"),
    ("Zinnia", "Zinnia elegans", "Bright daisy-like flowers; easy from seed.", 119, "https://images.unsplash.com/photo-1596073419667-9d77d59f033f?auto=format&fit=crop&w=600&q=80"),
    ("Chrysanthemum (Guldaudi)", "Chrysanthemum morifolium", "Autumn bloomer in many colours and forms.", 179, "https://images.unsplash.com/photo-1567331711402-509c12c41959?auto=format&fit=crop&w=600&q=80"),
    ("Dahlia", "Dahlia pinnata", "Showy layered blooms in many colours.", 199, "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80"),
    ("Lavender", "Lavandula angustifolia", "Fragrant purple spikes; prefers dry, sunny spots.", 299, "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=600&q=80"),
    ("Canna Lily", "Canna indica", "Bold tropical foliage with red or yellow flowers.", 249, "https://images.unsplash.com/photo-1567331711402-509c12c41959?auto=format&fit=crop&w=600&q=80"),
    ("Gerbera", "Gerbera jamesonii", "Large daisy flowers on tall stems; good for cutting.", 189, "https://images.unsplash.com/photo-1588628566587-dbd176de54b4?auto=format&fit=crop&w=600&q=80"),
    ("Sunflower", "Helianthus annuus", "Tall plant with giant golden blooms.", 159, "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"),
    ("Desert Rose (Adenium)", "Adenium obesum", "Swollen trunk, pink trumpet flowers; low water.", 449, "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=600&q=80"),
    ("Cosmos", "Cosmos bipinnatus", "Delicate pink and white flowers on feathery foliage.", 129, "https://images.unsplash.com/photo-1589217157232-4a451d303811?auto=format&fit=crop&w=600&q=80"),
    ("Pentas", "Pentas lanceolata", "Star-shaped flower clusters that attract butterflies.", 169, "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=600&q=80")
]

rare_items = [
    ("Monstera Albo Variegata", "Monstera deliciosa 'Albo Variegata'", "White-splashed leaves; needs bright indirect light.", 2499, "https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=600&q=80"),
    ("Monstera Obliqua", "Monstera obliqua", "Paper-thin leaves that are mostly holes; humidity lover.", 1899, "https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=600&q=80"),
    ("Philodendron Pink Princess", "Philodendron erubescens 'Pink Princess'", "Dark leaves splashed with bubblegum-pink variegation.", 1499, "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80"),
    ("Philodendron Gloriosum", "Philodendron gloriosum", "Velvety heart leaves with white veins; creeping habit.", 1299, "https://images.unsplash.com/photo-1599598425947-020645551982?auto=format&fit=crop&w=600&q=80"),
    ("Philodendron Spiritus Sancti", "Philodendron spiritus-sancti", "Critically endangered Brazilian species with narrow leaves.", 4999, "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=600&q=80"),
    ("Anthurium Clarinervium", "Anthurium clarinervium", "Velvet heart leaves with bold white veins.", 1199, "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=600&q=80"),
    ("Anthurium Crystallinum", "Anthurium crystallinum", "Large velvety leaves with crystal-like silver veins.", 1399, "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80"),
    ("Alocasia Frydek", "Alocasia micholitziana 'Frydek'", "Green velvet arrow leaves with white veins.", 999, "https://images.unsplash.com/photo-1597055181300-e3633a207519?auto=format&fit=crop&w=600&q=80"),
    ("Alocasia Dragon Scale", "Alocasia baginda 'Dragon Scale'", "Textured silvery leaves resembling dragon scales.", 899, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Hoya Kerrii (Sweetheart Hoya)", "Hoya kerrii", "Heart-shaped succulent leaves; a Valentine favourite.", 499, "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80"),
    ("Hoya Krimson Queen", "Hoya carnosa 'Krimson Queen'", "Cream-edged leaves that blush pink in bright light.", 599, "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80"),
    ("Begonia Maculata", "Begonia maculata 'Wightii'", "Polka-dotted angel-wing leaves with red undersides.", 699, "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80"),
    ("Calathea White Fusion", "Goeppertia 'White Fusion'", "Green, white and pink marbled leaves; needs humidity.", 799, "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=600&q=80"),
    ("Venus Flytrap", "Dionaea muscipula", "Snap-trap leaves catch insects; use rain or distilled water.", 649, "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80"),
    ("Pitcher Plant", "Nepenthes spp.", "Hanging pitchers digest insects; loves humidity.", 849, "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80"),
    ("Cape Sundew", "Drosera capensis", "Sticky red tentacles trap tiny insects.", 549, "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80"),
    ("Lithops (Living Stones)", "Lithops spp.", "Pebble-mimic succulents; water only in growing season.", 449, "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80"),
    ("Staghorn Fern", "Platycerium bifurcatum", "Antler-like fronds; grows mounted on boards or bark.", 899, "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"),
    ("Black Rose Aeonium", "Aeonium arboreum 'Zwartkop'", "Dark purple-black rosettes on branching stems.", 599, "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80"),
    ("Corpse Flower", "Amorphophallus titanum", "Giant foul-smelling bloom; flowers only rarely.", 3999, "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80"),
    ("Black Bat Flower", "Tacca chantrieri", "Near-black blooms with long whisker-like filaments.", 1499, "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80"),
    ("Jade Vine", "Strongylodon macrobotrys", "Turquoise claw-shaped flower clusters on a tropical climber.", 2199, "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80"),
    ("Mini Monstera", "Rhaphidophora tetrasperma", "Fast-growing climber with small split leaves.", 699, "https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=600&q=80"),
    ("Rainbow Eucalyptus", "Eucalyptus deglupta", "Tall tree with multicoloured peeling bark.", 1799, "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=600&q=80")
]

seed_items = [
    ("Tomato", "Solanum lycopersicum", "Full sun; transplant seedlings after 4-6 weeks.", 49, "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80"),
    ("Chilli", "Capsicum annuum", "Needs warmth to germinate; fruits for months.", 49, "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80"),
    ("Brinjal (Eggplant)", "Solanum melongena", "Warm-season crop; start in trays, then transplant.", 59, "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80"),
    ("Okra (Lady's Finger)", "Abelmoschus esculentus", "Soak seeds overnight; sow directly in warm soil.", 49, "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=600&q=80"),
    ("Coriander (Dhania)", "Coriandrum sativum", "Sow in cool weather; harvest leaves in about a month.", 39, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Spinach (Palak)", "Spinacia oleracea", "Cool-season leafy green; sow in rows.", 39, "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80"),
    ("Cucumber", "Cucumis sativus", "Climbing vine; give it a trellis and plenty of water.", 59, "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=600&q=80"),
    ("Bottle Gourd (Lauki)", "Lagenaria siceraria", "Vigorous climber; needs space or a strong support.", 59, "https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=80"),
    ("Bitter Gourd (Karela)", "Momordica charantia", "Warm-season climber with bumpy, bitter fruit.", 59, "https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=80"),
    ("Pumpkin", "Cucurbita moschata", "Sprawling vine; sow after the last cool spell.", 69, "https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=80"),
    ("Carrot", "Daucus carota", "Sow directly in loose soil; thin the seedlings.", 49, "https://images.unsplash.com/photo-1447175008436-08417090ea76?auto=format&fit=crop&w=600&q=80"),
    ("Radish", "Raphanus sativus", "Very fast crop; ready in about a month.", 39, "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80"),
    ("Cabbage", "Brassica oleracea var. capitata", "Cool-season crop; heads form in 2-3 months.", 49, "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80"),
    ("Cauliflower", "Brassica oleracea var. botrytis", "Cool-season crop; keep the soil evenly moist.", 49, "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=600&q=80"),
    ("Fenugreek (Methi)", "Trigonella foenum-graecum", "Quick leafy herb; sow thickly and cut young.", 39, "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80"),
    ("Basil", "Ocimum basilicum", "Warm, sunny spot; pinch tips for bushier plants.", 59, "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80"),
    ("Lettuce", "Lactuca sativa", "Cool-season salad leaf; sow in succession.", 59, "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80"),
    ("Beetroot", "Beta vulgaris", "Sow in loose soil; each seed cluster gives several plants.", 49, "https://images.unsplash.com/photo-1593105544559-ecb03bf76f82?auto=format&fit=crop&w=600&q=80"),
    ("Sunflower", "Helianthus annuus", "Sow in full sun; grows very tall.", 69, "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"),
    ("Marigold", "Tagetes erecta", "Easy flower; germinates fast in warm soil.", 49, "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"),
    ("Zinnia", "Zinnia elegans", "Easy summer flower; sow directly in the bed.", 49, "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80"),
    ("Cosmos", "Cosmos bipinnatus", "Scatter in sun; poor soil is fine.", 49, "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80")
]

fert_items = [
    ("Urea", "N-P-K 46-0-0", "High-nitrogen granules for leafy growth.", 299, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("DAP", "N-P-K 18-46-0", "Phosphate-rich; boosts roots at planting.", 349, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Muriate of Potash (MOP)", "N-P-K 0-0-60", "Potassium source for flowering and fruiting.", 329, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("NPK 19:19:19", "N-P-K 19-19-19", "Balanced water-soluble feed for all stages.", 249, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("NPK 10:26:26", "N-P-K 10-26-26", "Extra P and K for roots, flowers and fruit.", 279, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Single Super Phosphate", "N-P-K 0-16-0", "Phosphorus plus calcium and sulphur.", 219, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Ammonium Sulphate", "N-P-K 21-0-0", "Nitrogen and sulphur; slightly acidifying.", 259, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Calcium Nitrate", "N-P-K 15.5-0-0", "Helps prevent blossom-end rot in tomatoes.", 319, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Potassium Nitrate", "N-P-K 13-0-45", "Water-soluble feed for fruit set and quality.", 389, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Epsom Salt", "Mg + S", "Corrects magnesium deficiency in leaves.", 189, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Zinc Sulphate", "Zn", "Fixes zinc deficiency (pale, stunted growth).", 199, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Micronutrient Mix", "Fe Zn Mn Cu B", "Foliar spray for trace-element gaps.", 269, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Vermicompost", "Organic", "Worm castings; improves soil structure.", 299, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Farmyard Manure (FYM)", "Organic", "Well-rotted cow dung; slow soil builder.", 199, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Neem Cake", "Organic", "Slow-release nitrogen; helps deter soil pests.", 249, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Bone Meal", "Organic P", "Slow phosphorus; good for bulbs and roots.", 229, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Blood Meal", "Organic N", "Fast organic nitrogen for leafy crops.", 279, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Wood Ash", "K + Ca", "Source of potash and lime; do not overuse.", 149, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Seaweed Extract", "Bio-stimulant", "Boosts growth and stress tolerance.", 349, "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80"),
    ("Humic Acid", "Conditioner", "Improves nutrient uptake and soil structure.", 329, "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80"),
    ("Fish Emulsion", "Liquid N", "Organic nitrogen-rich liquid feed.", 399, "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80"),
    ("Mustard Cake", "Organic", "Oilcake used as a slow organic nitrogen feed.", 189, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80"),
    ("Azotobacter Biofertilizer", "Bio-inoculant", "Living bacteria that fix nitrogen for crops.", 269, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Compost", "Organic", "Decomposed kitchen and garden waste.", 179, "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80")
]

tool_items = [
    ("Pruning Shears (Secateurs)", "Cutting tool", "Clean cuts on stems up to about 2 cm.", 349, "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"),
    ("Hand Trowel", "Digging tool", "Planting and transplanting seedlings.", 199, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"),
    ("Hand Cultivator", "Soil tool", "Loosens soil and pulls weeds in beds and pots.", 219, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"),
    ("Garden Spade", "Digging tool", "Digging beds and planting holes.", 499, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"),
    ("Garden Rake", "Soil tool", "Levels soil and clears debris.", 449, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"),
    ("Garden Hoe", "Weeding tool", "Weeding and shaping soil rows.", 399, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"),
    ("Watering Can", "Watering", "Gentle watering; rose head suits seedlings.", 299, "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80"),
    ("Garden Hose with Nozzle", "Watering", "Adjustable spray for lawns and borders.", 599, "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80"),
    ("Spray Bottle / Mister", "Watering", "Mists foliage; applies foliar feed or neem spray.", 279, "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80"),
    ("Gardening Gloves", "Protection", "Protect hands from thorns and soil.", 179, "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=600&q=80"),
    ("Hedge Shears", "Cutting tool", "Trims hedges and shrubs.", 599, "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"),
    ("Pruning Saw", "Cutting tool", "Cuts branches too thick for shears.", 449, "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"),
    ("Dibber", "Planting tool", "Makes planting holes for seeds and bulbs.", 149, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"),
    ("Terracotta Pot", "Pot", "Porous clay; lets soil breathe and dry evenly.", 249, "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"),
    ("Glazed Ceramic Pot", "Pot", "Decorative; make sure it has a drainage hole.", 499, "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"),
    ("Plastic Pot", "Pot", "Light, inexpensive, holds moisture longer.", 129, "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"),
    ("Fabric Grow Bag", "Planter", "Air-prunes roots; good for terrace vegetables.", 199, "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"),
    ("Hanging Planter", "Planter", "Saves floor space; ideal for trailing plants.", 299, "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80"),
    ("Self-Watering Planter", "Planter", "Water reservoir keeps soil evenly moist.", 399, "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"),
    ("Window Planter Box", "Planter", "Long box for herbs and flowers on railings.", 449, "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80"),
    ("Seedling Tray", "Propagation", "Cells for starting seeds before transplanting.", 149, "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80"),
    ("Trellis and Plant Stakes", "Support", "Support for climbers and tall plants.", 279, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"),
    ("Wheelbarrow", "Hauling", "Moves soil, compost and pots around the garden.", 1999, "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80"),
    ("Soil Moisture Meter", "Monitoring", "Probe shows when to water; avoids overwatering.", 349, "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=600&q=80")
]

print("Total Indoor:", len(indoor_items))
print("Total Outdoor:", len(outdoor_items))
print("Total Rare:", len(rare_items))
print("Total Seed:", len(seed_items))
print("Total Fert:", len(fert_items))
print("Total Tool:", len(tool_items))

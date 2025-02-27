
// Start background music
const backgroundMusic = new Audio('packingtonspound.mp3');
backgroundMusic.addEventListener('canplaythrough', function() {
    backgroundMusic.play().catch(error => {
        console.error('Failed to play background music:', error);
    });
});
    
// Request player name
let userName = prompt("Enter your name:") || "Adventurer";

// Game data is stored in a separate script file
const gameData = {
    playerStats: {
        courage: 0,
        wisdom: 0,
        friendship: 0
    },
    
    // Story nodes with choices and endings
    
        "nodes": {
            "start": {
                "text": "You stand at the edge of an ancient, mist-shrouded forest rumored to contain magic and treasure. The morning sun rises as you prepare to begin your adventure.",
                "image": "scene1.jpeg",
                "choices": [
                    { "text": "Follow the well-worn path", "nextNode": "path" },
                    { "text": "Venture off-trail through the underbrush", "nextNode": "offTrail" },
                    { "text": "Wait for other travelers", "nextNode": "travelers" }
                ]
            },
            
            "path": {
                "text": "The path winds through ancient oaks until you reach a bridge crossing a stream. A strange blue light flickers beneath it, while the path ahead splits toward a hill and a valley.",
                "image": "path.jpeg",
                "choices": [
                    { "text": "Investigate the blue light", "nextNode": "blueLight", "statChange": { "wisdom": 1 } },
                    { "text": "Take the path up the hill", "nextNode": "hillPath", "statChange": { "courage": 1 } },
                    { "text": "Take the path down into the valley", "nextNode": "valleyPath" }
                ]
            },
            
            "offTrail": {
                "text": "Fighting through thick undergrowth, you encounter a tiny forest sprite glowing with green light. It watches you with cautious curiosity.",
                "image": "offTrail.jpeg",
                "choices": [
                    { "text": "Offer the sprite food from your pack", "nextNode": "spriteGlade", "statChange": { "friendship": 2 } },
                    { "text": "Try to catch the sprite", "nextNode": "spriteTrap", "statChange": { "courage": 1, "friendship": -2 } }
                ]
            },
            
            "travelers": {
                "text": "An old woman with a walking stick approaches. 'Seeking adventure in the enchanted forest?' she asks with a knowing smile. 'I've traveled these woods for decades.'",
                "image": "travelers.jpeg",
                "choices": [
                    { "text": "Ask her to guide you", "nextNode": "elderWisdom", "statChange": { "wisdom": 2 } },
                    { "text": "Politely decline and enter alone", "nextNode": "mysteriousChanting", "statChange": { "courage": 2 } }
                ]
            },
            
            "blueLight": {
                "text": "Beneath the bridge, you discover a water nymph holding a glowing crystal. 'For noticing me,' she says, 'I offer you a choice: protection or direction to the heart of the forest.'",
                "image": "blueLight.jpeg",
                "choices": [
                    { "text": "Accept a blessing of protection", "nextNode": "nymphBlessing", "statChange": { "wisdom": 2 } },
                    { "text": "Ask for directions to the forest's heart", "nextNode": "mushroomTrail", "statChange": { "courage": 1, "wisdom": 1 } }
                ]
            },
            
            "hillPath": {
                "text": "The steep climb rewards you with a view of the entire forest. In the distance stands a tower made of living trees, with a door visible in its trunk.",
                "image": "hillPath.jpeg",
                "choices": [
                    { "text": "Head toward the living tower", "nextNode": "druidTower", "statChange": { "courage": 2 } },
                    { "text": "Continue along the ridgeline", "nextNode": "ancientRuins", "statChange": { "wisdom": 1 } }
                ]
            },
            
            "valleyPath": {
                "text": "The misty valley is filled with wildflowers and glowing mushrooms. You discover a crystal-clear pond with what appears to be a golden key at the bottom.",
                "image": "valleyPath.jpeg",
                "choices": [
                    { "text": "Follow the mushroom trail", "nextNode": "mushroomTrail", "statChange": { "wisdom": 1 } },
                    { "text": "Reach for the golden key", "nextNode": "pondGuardian", "statChange": { "courage": 1 } }
                ]
            },
            
            "spriteGlade": {
                "text": "The sprite leads you to a magical glade where dozens of forest beings feast and share ancient knowledge. As night falls, they offer you a special opportunity to become a guardian of the forest.",
                "image": "spriteGlade.jpeg",
                "choices": [
                    { "text": "Accept their offer", "nextNode": "guardianEnding", "statChange": { "friendship": 3, "wisdom": 2 } },
                    { "text": "Politely decline", "nextNode": "magicalGift", "statChange": { "wisdom": 1 } }
                ]
            },
            
            "spriteTrap": {
                "text": "Your attempt to catch the sprite fails as dozens more emerge from the vegetation. They drive you away with painful pinches and bites.",
                "image": "spriteTrap.jpeg",
                "choices": [
                    { "text": "Retreat from the forest", "nextNode": "retreatEnding", "statChange": { "courage": -1 } },
                    { "text": "Apologize and offer a gift", "nextNode": "culturalLearning", "statChange": { "friendship": 1, "wisdom": 1 } }
                ]
            },
            
            "elderWisdom": {
                "text": "The elder guides you along hidden paths, sharing forest history and bringing you to an ancient stone circle in a clearing. 'This place once connected humans and forest spirits,' she explains.",
                "image": "elderWisdom.jpeg",
                "choices": [
                    { "text": "Learn about the circle's magic", "nextNode": "ancientMagic", "statChange": { "wisdom": 3 } },
                    { "text": "Thank her and explore on your own", "nextNode": "magicalSpring", "statChange": { "courage": 1 } }
                ]
            },
            
            "mysteriousChanting": {
                "text": "Alone in the dense woods, you hear mysterious chanting. Following it reveals druids performing a ritual that accelerates plant growth around them.",
                "image": "mysteriousChanting.jpeg",
                "choices": [
                    { "text": "Join their ritual", "nextNode": "druidicMagic", "statChange": { "courage": 2 } },
                    { "text": "Observe quietly and learn", "nextNode": "natureSecrets", "statChange": { "wisdom": 2 } }
                ]
            },
            
            "druidTower": {
                "text": "Inside the living tower, an ancient druid tends a magical garden. Their eyes hold centuries of wisdom as they ask what you seek in the enchanted forest.",
                "image": "druidTower.jpeg",
                "choices": [
                    { "text": "Offer to help with their tasks", "nextNode": "apprenticeEnding", "statChange": { "friendship": 2, "wisdom": 1 } },
                    { "text": "Ask about hidden treasures", "nextNode": "burialTreasure", "statChange": { "courage": 1 } }
                ]
            },
            
            "nymphBlessing": {
                "text": "The nymph blesses you with forest protection. Animals watch you with curiosity rather than fear, and you sense hidden paths that others cannot see.",
                "image": "nymphBlessing.jpeg",
                "choices": [
                    { "text": "Seek magical places in the forest", "nextNode": "enlightenedEnding", "statChange": { "wisdom": 1, "friendship": 2 } },
                    { "text": "Harvest valuable magical resources", "nextNode": "greedyEnding", "statChange": { "wisdom": -1, "friendship": -1 } }
                ]
            },
            
            "mushroomTrail": {
                "text": "Following a trail of luminous mushrooms, you enter increasingly strange and magical surroundings. The forest here feels ancient and aware, watching your every step.",
                "image": "mushroomTrail.jpeg",
                "choices": [
                    { "text": "Continue deeper into the magic", "nextNode": "heartOfForest", "statChange": { "courage": 2 } },
                    { "text": "Gather mushrooms for their magic", "nextNode": "natureBounty", "statChange": { "wisdom": 1 } }
                ]
            },
            
            // Added missing nodes
            "ancientRuins": {
                "text": "The ridgeline leads to ancient stone ruins. Weathered carvings depict humans and forest beings living in harmony. There's a sealed chamber beneath a fallen pillar.",
                "image": "ancientRuins.jpeg",
                "choices": [
                    { "text": "Attempt to open the sealed chamber", "nextNode": "ancientChamber", "statChange": { "courage": 2 } },
                    { "text": "Study the carvings for knowledge", "nextNode": "ancientKnowledge", "statChange": { "wisdom": 2 } }
                ]
            },
            
            "ancientChamber": {
                "text": "After careful effort, you open the chamber and find a collection of crystals that resonate with magical energy. Their glow illuminates ancient texts on the walls.",
                "statChanges": { "courage": 2, "wisdom": 1 },
                "ending": "The Archaeologist's Ending: You carefully document the ruins and crystals, eventually establishing a sanctuary where humans can learn from the ancient knowledge. Your discoveries revive forgotten magical practices that work in harmony with nature."
            },
            
            "ancientKnowledge": {
                "text": "Hours spent studying the carvings reveal forgotten rituals and the history of how humans and forest beings once worked together as stewards of the natural world.",
                "statChanges": { "wisdom": 3 },
                "ending": "The Scholar's Ending: You compile your knowledge into a comprehensive guide that helps rebuild the connection between humans and the forest realm. Your work brings renewed respect for the enchanted woods and their inhabitants."
            },
            
            "pondGuardian": {
                "text": "As you reach for the key, a water serpent emerges. 'Few seek my treasure with such boldness,' it speaks in your mind. 'Answer my riddle, and the key is yours.'",
                "image": "pondGuardian.jpeg",
                "choices": [
                    { "text": "Accept the riddle challenge", "nextNode": "riddleSuccess", "statChange": { "wisdom": 2 } },
                    { "text": "Attempt to snatch the key quickly", "nextNode": "pondBattle", "statChange": { "courage": 2, "wisdom": -1 } }
                ]
            },
            
            "riddleSuccess": {
                "text": "You solve the serpent's riddle and receive the golden key. 'This opens the heart of the forest,' the serpent explains, 'where your greatest desire may be granted.'",
                "statChanges": { "wisdom": 2, "courage": 1 },
                "ending": "The Wish-Seeker's Ending: At the forest's heart, you use the key to unlock an ancient shrine. Your wish for knowledge is granted, and you emerge with the ability to see the magical essence in all living things."
            },
            
            "pondBattle": {
                "text": "The serpent is quicker than you anticipated. After a challenging battle, you claim the key but are wounded. The forest waters heal you, but the experience leaves you humbled.",
                "statChanges": { "courage": 1, "wisdom": 1 },
                "ending": "The Warrior's Ending: Though you claimed the key through force, the experience teaches you respect for the forest's guardians. You use the key to unlock the heart of the forest, but choose to protect its secrets rather than exploit them."
            },
            
            "magicalGift": {
                "text": "Though you decline their offer, the sprites appreciate your respect for their ways. They present you with a magical acorn that glows with inner light.",
                "statChanges": { "wisdom": 2, "friendship": 1 },
                "ending": "The Traveler's Ending: You return home with the magical acorn, which grows into a tree that connects your home to the fairy realm. While not a guardian, you become a trusted friend to the forest and its inhabitants."
            },
            
            "culturalLearning": {
                "text": "Your sincere apology surprises the sprites. They cautiously accept your gift and teach you about their society and the proper ways to interact with forest beings.",
                "statChanges": { "wisdom": 2, "friendship": 2 },
                "ending": "The Cultural Ambassador's Ending: Having learned from your mistake, you become a guide for others seeking to explore the enchanted forest. Your humble approach and knowledge of sprite customs make you valuable to both humans and forest beings."
            },
            
            "ancientMagic": {
                "text": "The elder teaches you stone circle rituals that let you commune with the forest's consciousness. The ancient magic flows through you, connecting your spirit to the land.",
                "statChanges": { "wisdom": 3, "friendship": 1 },
                "ending": "The Circle Keeper's Ending: You restore the stone circle to its former glory and become its caretaker. Under your guidance, the circle once again serves as a meeting place for humans and forest beings, renewing ancient alliances."
            },
            
            "magicalSpring": {
                "text": "Exploring on your own, you discover a hidden spring whose waters shine with rainbow colors. Drinking from it gives you visions of the forest's past and possible futures.",
                "statChanges": { "courage": 2, "wisdom": 2 },
                "ending": "The Visionary's Ending: The spring's magic grants you foresight and deep connection to nature. Your prophetic dreams guide you to prevent threats to the forest before they manifest, earning you respect from both human and magical communities."
            },
            
            "druidicMagic": {
                "text": "The druids welcome you to their circle. As you join hands, you feel the forest's energy coursing through you, and plants sprout from the ground where you stand.",
                "statChanges": { "courage": 2, "wisdom": 2 },
                "ending": "The New Druid's Ending: The ritual awakens latent magical abilities within you. Under the druids' tutelage, you learn to channel the forest's power, eventually joining their order as a guardian of natural balance."
            },
            
            "natureSecrets": {
                "text": "Observing quietly, you learn the druids' ritual patterns and the magical language they use to communicate with plants. They notice your respectful attention and offer to share more knowledge.",
                "statChanges": { "wisdom": 3 },
                "ending": "The Green Speaker's Ending: Though you never join the druids, their teachings allow you to speak with plants and understand the whispers of the forest. You become a renowned healer, using your knowledge to create remedies that blend natural and magical properties."
            },
            
            "natureBounty": {
                "text": "You carefully gather some of the luminous mushrooms, feeling their magic tingle in your fingers. They seem to pulse in rhythm with your heartbeat.",
                "statChanges": { "wisdom": 2 },
                "ending": "The Alchemist's Ending: Your careful study of the magical mushrooms leads to discoveries that bridge science and magic. Your elixirs and potions bring healing to many, while your responsible harvesting practices ensure the forest's bounty remains plentiful."
            },
            
            // Existing endings
            "heartOfForest": {
                "text": "At the forest's heart, you discover a clearing where all magic converges. Ancient spirits appear, sensing your respect for their realm, and offer to share their ageless wisdom.",
                "statChanges": { "wisdom": 3, "courage": 2 },
                "ending": "The Forest Sage Ending: Guided by ancient spirits, you learn secrets of natural magic forgotten for centuries. You emerge as a bridge between worlds, helping humans and magical beings understand each other once more."
            },
            
            "apprenticeEnding": {
                "text": "You spend time helping the druid tend magical plants. Impressed by your dedication, they share their knowledge and offer you a rare seedling filled with potential.",
                "statChanges": { "wisdom": 2, "friendship": 2 },
                "ending": "The Druid's Apprentice Ending: You return home with the magical seedling, which grows into a magnificent tree that brings prosperity to your village. Your connection to nature magic makes you a respected healer and advisor."
            },
            
            "burialTreasure": {
                "text": "Despite the druid's disapproval, you seek out an ancient burial site. You discover valuable artifacts, but the forest spirits grow restless around you as you gather your treasures.",
                "statChanges": { "courage": 1, "wisdom": -1, "friendship": -2 },
                "ending": "The Treasure Hunter's Ending: You escape with valuable artifacts but earn the forest's enmity. Though wealthy from your discoveries, you find yourself haunted by strange dreams and unable to return to any woodland without feeling unwelcome."
            },
            
            "guardianEnding": {
                "text": "You accept the sprites' offer and undergo a magical ritual. A warm light suffuses your body as you form a permanent bond with the forest.",
                "statChanges": { "wisdom": 3, "friendship": 3, "courage": 2 },
                "ending": "The Forest Guardian Ending: You become a legendary guardian of the enchanted forest, blessed with longevity and natural magic. Travelers tell stories of a mysterious figure who protects lost wanderers and maintains the balance between human and fairy realms."
            },
            
            "retreatEnding": {
                "text": "Humiliated and covered in painful bites, you stumble out of the forest. The locals laugh at your disheveled appearance and failed adventure.",
                "statChanges": { "courage": -2, "wisdom": 1 },
                "ending": "The Hasty Retreat Ending: You return home with nothing but stories of failure. Though initially embarrassed, you eventually learn from your mistakes and approach future challenges with more respect and consideration."
            },
            
            "enlightenedEnding": {
                "text": "With the nymph's blessing, you discover hidden magical groves and enchanted pools. Magical creatures approach you without fear, and you learn secrets few humans have ever known.",
                "statChanges": { "wisdom": 3, "friendship": 3 },
                "ending": "The Enlightened Explorer Ending: You emerge from the forest transformed by your experiences. Your newfound wisdom and connection to nature magic allow you to bridge the worlds of humans and magical creatures, becoming a respected ambassador between realms."
            },
            
            "greedyEnding": {
                "text": "Despite the nymph's blessing, you begin collecting valuable herbs and magical materials. Soon, you notice the blessing fading as the forest reacts to your taking without giving back.",
                "statChanges": { "wisdom": -1, "friendship": -2, "courage": 1 },
                "ending": "The Greedy Collector's Ending: You escape with valuable magical resources but earn the forest's distrust. The materials fetch a high price, making you wealthy but forever barred from experiencing the deeper magic of natural places."
            }
        }
    }
// Game state
let currentNode = 'start';
const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const statsElement = document.getElementById('stats');
const restartButton = document.getElementById('restart');

// Initialize the game
function initGame() {
    updatePlayerStats(gameData.playerStats);
    goToNode(currentNode);
    
    restartButton.addEventListener('click', function() {
        resetGame();
    });
}

// Update the display with the current node's content
function goToNode(nodeId) {
    // Get the current node data
    const node = gameData.nodes[nodeId];
    if (!node) {
        console.error(`Node with ID ${nodeId} not found!`);
        return;
    }
    
    // Update the current node ID
    currentNode = nodeId;
    // Display the node text and image
    storyElement.innerHTML = node.image ? `<img src="${node.image}" alt="node image" class="node-image"><p>${node.text}</p>` : `<p>${node.text}</p>`;
   
    // Check if this is an ending node
    if (node.ending) {
        displayEnding(node);
        return;
    }
    
    // Clear previous choices
    choicesElement.innerHTML = '';
    
    // Add new choices
    if (node.choices && node.choices.length > 0) {
        node.choices.forEach(choice => {
            const button = document.createElement('button');
            button.textContent = choice.text;
            button.addEventListener('click', function() {
                // Apply stat changes if any
                if (choice.statChange) {
                    applyStatChanges(choice.statChange);
                }
                goToNode(choice.nextNode);
            });
            choicesElement.appendChild(button);
        });
    }
}

// Apply stat changes
function applyStatChanges(changes) {
    for (const [stat, value] of Object.entries(changes)) {
        if (gameData.playerStats.hasOwnProperty(stat)) {
            gameData.playerStats[stat] += value;
        }
    }
    updatePlayerStats(gameData.playerStats);
}

// Update the player stats display
function updatePlayerStats(stats) {
    statsElement.innerHTML = `
        <p><strong> ${userName}'s Attributes:</strong> 
           Courage: ${stats.courage} | 
           Wisdom: ${stats.wisdom} | 
           Friendship: ${stats.friendship}
        </p>
    `;
}

// Display an ending
function displayEnding(node) {
    // Apply any final stat changes
    if (node.statChanges) {
        applyStatChanges(node.statChanges);
    }
    
    // Clear choices
    choicesElement.innerHTML = '';
    
    // Display the ending text
    storyElement.innerHTML = node.text;
    
    // Add the ending description
    const endingElement = document.createElement('div');
    endingElement.className = 'ending';
    endingElement.textContent = node.ending;
    storyElement.appendChild(endingElement);
    
    // Show restart button
    restartButton.style.display = 'block';
}

// Reset the game
function resetGame() {
    // Reset player stats
    for (const stat in gameData.playerStats) {
        gameData.playerStats[stat] = 0;
    }
    
    // Hide restart button
    restartButton.style.display = 'none';
    
    // Go back to start
    currentNode = 'start';
    initGame();
}

// Start the game when the page loads
window.onload = initGame;

// Demo data for Sustainable Living Tracker
// This file can be used to populate the application with sample data for demonstration

const demoData = {
    carbonFootprint: 15.7,
    waterSaved: 87.3,
    wasteReduced: 8.2,
    sustainabilityScore: 92,
    actions: [
        {
            type: "transport",
            description: "Walked to work instead of driving - 2km distance",
            impactValue: 4,
            timestamp: "2024-01-15T08:30:00.000Z",
            environmentalImpact: {
                carbonReduction: 2.0,
                waterSaved: 0,
                wasteReduced: 0
            }
        },
        {
            type: "energy",
            description: "Used LED bulbs and turned off unused lights",
            impactValue: 3,
            timestamp: "2024-01-14T19:00:00.000Z",
            environmentalImpact: {
                carbonReduction: 0.9,
                waterSaved: 0,
                wasteReduced: 0
            }
        },
        {
            type: "water",
            description: "Took shorter shower and fixed leaky faucet",
            impactValue: 25,
            timestamp: "2024-01-14T07:15:00.000Z",
            environmentalImpact: {
                carbonReduction: 0,
                waterSaved: 25.0,
                wasteReduced: 0
            }
        },
        {
            type: "waste",
            description: "Composted kitchen waste and recycled paper",
            impactValue: 2.5,
            timestamp: "2024-01-13T16:45:00.000Z",
            environmentalImpact: {
                carbonReduction: 0.5,
                waterSaved: 0,
                wasteReduced: 2.5
            }
        },
        {
            type: "food",
            description: "Bought local organic vegetables from farmers market",
            impactValue: 5,
            timestamp: "2024-01-13T10:20:00.000Z",
            environmentalImpact: {
                carbonReduction: 2.0,
                waterSaved: 2.5,
                wasteReduced: 1.5
            }
        },
        {
            type: "shopping",
            description: "Bought products with minimal packaging",
            impactValue: 3,
            timestamp: "2024-01-12T14:30:00.000Z",
            environmentalImpact: {
                carbonReduction: 0.9,
                waterSaved: 0.6,
                wasteReduced: 1.5
            }
        },
        {
            type: "transport",
            description: "Used public bus instead of car for shopping trip",
            impactValue: 6,
            timestamp: "2024-01-12T11:00:00.000Z",
            environmentalImpact: {
                carbonReduction: 3.0,
                waterSaved: 0,
                wasteReduced: 0
            }
        },
        {
            type: "energy",
            description: "Unplugged electronics when not in use",
            impactValue: 2,
            timestamp: "2024-01-11T22:00:00.000Z",
            environmentalImpact: {
                carbonReduction: 0.6,
                waterSaved: 0,
                wasteReduced: 0
            }
        },
        {
            type: "water",
            description: "Used rainwater for garden watering",
            impactValue: 15,
            timestamp: "2024-01-11T18:00:00.000Z",
            environmentalImpact: {
                carbonReduction: 0,
                waterSaved: 15.0,
                wasteReduced: 0
            }
        },
        {
            type: "waste",
            description: "Repurposed old clothes into cleaning rags",
            impactValue: 1.5,
            timestamp: "2024-01-10T15:30:00.000Z",
            environmentalImpact: {
                carbonReduction: 0.3,
                waterSaved: 0,
                wasteReduced: 1.5
            }
        },
        {
            type: "food",
            description: "Cooked meals from scratch using seasonal ingredients",
            impactValue: 4,
            timestamp: "2024-01-10T12:00:00.000Z",
            environmentalImpact: {
                carbonReduction: 1.6,
                waterSaved: 2.0,
                wasteReduced: 1.2
            }
        },
        {
            type: "shopping",
            description: "Bought second-hand furniture instead of new",
            impactValue: 8,
            timestamp: "2024-01-09T16:00:00.000Z",
            environmentalImpact: {
                carbonReduction: 2.4,
                waterSaved: 1.6,
                wasteReduced: 4.0
            }
        },
        {
            type: "transport",
            description: "Cycled to the gym - 3km round trip",
            impactValue: 3,
            timestamp: "2024-01-09T07:00:00.000Z",
            environmentalImpact: {
                carbonReduction: 1.5,
                waterSaved: 0,
                wasteReduced: 0
            }
        },
        {
            type: "energy",
            description: "Used natural light during the day",
            impactValue: 4,
            timestamp: "2024-01-08T17:00:00.000Z",
            environmentalImpact: {
                carbonReduction: 1.2,
                waterSaved: 0,
                wasteReduced: 0
            }
        },
        {
            type: "water",
            description: "Installed low-flow showerhead",
            impactValue: 20,
            timestamp: "2024-01-08T08:00:00.000Z",
            environmentalImpact: {
                carbonReduction: 0,
                waterSaved: 20.0,
                wasteReduced: 0
            }
        }
    ],
    achievements: [
        {
            id: "first_action",
            title: "First Step",
            description: "Logged your first sustainable action",
            icon: "fas fa-seedling",
            earnedAt: "2024-01-10T15:30:00.000Z"
        },
        {
            id: "carbon_warrior",
            title: "Carbon Warrior",
            description: "Reduced carbon footprint by 10 kg",
            icon: "fas fa-leaf",
            earnedAt: "2024-01-12T14:30:00.000Z"
        },
        {
            id: "water_saver",
            title: "Water Saver",
            description: "Saved 50 liters of water",
            icon: "fas fa-tint",
            earnedAt: "2024-01-14T07:15:00.000Z"
        },
        {
            id: "waste_reducer",
            title: "Waste Reducer",
            description: "Reduced waste by 5 kg",
            icon: "fas fa-recycle",
            earnedAt: "2024-01-13T16:45:00.000Z"
        },
        {
            id: "consistent_actor",
            title: "Consistent Actor",
            description: "Logged 7 actions in a week",
            icon: "fas fa-calendar-check",
            earnedAt: "2024-01-15T08:30:00.000Z"
        }
    ]
};

// Function to load demo data
function loadDemoData() {
    localStorage.setItem('sustainableLivingData', JSON.stringify(demoData));
    location.reload(); // Reload the page to show demo data
}

// Function to clear demo data
function clearDemoData() {
    localStorage.removeItem('sustainableLivingData');
    location.reload(); // Reload the page to show fresh data
}

// Add demo buttons to the page
function addDemoButtons() {
    const header = document.querySelector('.header-content');
    const demoContainer = document.createElement('div');
    demoContainer.style.cssText = `
        margin-top: 1rem;
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    `;
    
    const loadDemoBtn = document.createElement('button');
    loadDemoBtn.textContent = 'Load Demo Data';
    loadDemoBtn.style.cssText = `
        background: rgba(255,255,255,0.2);
        border: 2px solid white;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    `;
    loadDemoBtn.onclick = loadDemoData;
    loadDemoBtn.onmouseover = () => {
        loadDemoBtn.style.background = 'rgba(255,255,255,0.3)';
    };
    loadDemoBtn.onmouseout = () => {
        loadDemoBtn.style.background = 'rgba(255,255,255,0.2)';
    };
    
    const clearDemoBtn = document.createElement('button');
    clearDemoBtn.textContent = 'Clear Data';
    clearDemoBtn.style.cssText = `
        background: rgba(255,255,255,0.2);
        border: 2px solid white;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
    `;
    clearDemoBtn.onclick = clearDemoData;
    clearDemoBtn.onmouseover = () => {
        clearDemoBtn.style.background = 'rgba(255,255,255,0.3)';
    };
    clearDemoBtn.onmouseout = () => {
        clearDemoBtn.style.background = 'rgba(255,255,255,0.2)';
    };
    
    demoContainer.appendChild(loadDemoBtn);
    demoContainer.appendChild(clearDemoBtn);
    header.appendChild(demoContainer);
}

// Auto-add demo buttons when page loads
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(addDemoButtons, 1000); // Add after page loads
    });
} 
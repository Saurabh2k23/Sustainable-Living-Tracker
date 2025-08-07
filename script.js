// Global variables
let userData = {
    carbonFootprint: 0,
    waterSaved: 0,
    wasteReduced: 0,
    sustainabilityScore: 85,
    actions: [],
    achievements: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadUserData();
    updateDashboard();
    displayAchievements();
    drawProgressChart();
});

// Initialize the application
function initializeApp() {
    // Set current date
    const currentDate = new Date();
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('currentDate').textContent = currentDate.toLocaleDateString('en-US', dateOptions);
    
    // Initialize modal functionality
    initializeModal();
    
    // Initialize form submission
    document.getElementById('actionForm').addEventListener('submit', handleActionSubmission);
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('actionModal');
    const closeBtn = document.querySelector('.close');
    
    // Close modal when clicking X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Load user data from localStorage
function loadUserData() {
    const savedData = localStorage.getItem('sustainableLivingData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('sustainableLivingData', JSON.stringify(userData));
}

// Update dashboard with current data
function updateDashboard() {
    document.getElementById('carbonFootprint').textContent = `${userData.carbonFootprint.toFixed(1)} kg CO₂`;
    document.getElementById('waterSaved').textContent = `${userData.waterSaved.toFixed(1)} L`;
    document.getElementById('wasteReduced').textContent = `${userData.wasteReduced.toFixed(1)} kg`;
    document.getElementById('sustainabilityScore').textContent = `${userData.sustainabilityScore}/100`;
}

// Log action function (called from HTML buttons)
function logAction(actionType) {
    const modal = document.getElementById('actionModal');
    const actionTypeSelect = document.getElementById('actionType');
    
    // Pre-select the action type based on button clicked
    actionTypeSelect.value = actionType;
    
    // Show modal
    modal.style.display = 'block';
}

// Handle action form submission
function handleActionSubmission(event) {
    event.preventDefault();
    
    const actionType = document.getElementById('actionType').value;
    const description = document.getElementById('actionDescription').value;
    const impactValue = parseFloat(document.getElementById('impactValue').value);
    
    if (!actionType || !description || isNaN(impactValue)) {
        alert('Please fill in all fields with valid values.');
        return;
    }
    
    // Create action object
    const action = {
        type: actionType,
        description: description,
        impactValue: impactValue,
        timestamp: new Date().toISOString(),
        environmentalImpact: calculateEnvironmentalImpact(actionType, impactValue)
    };
    
    // Add action to user data
    userData.actions.push(action);
    
    // Update environmental metrics
    updateEnvironmentalMetrics(action);
    
    // Check for achievements
    checkAchievements();
    
    // Save data and update dashboard
    saveUserData();
    updateDashboard();
    displayAchievements();
    drawProgressChart();
    
    // Close modal and reset form
    document.getElementById('actionModal').style.display = 'none';
    document.getElementById('actionForm').reset();
    
    // Show success message
    showNotification('Action logged successfully! 🌱', 'success');
}

// Calculate environmental impact based on action type
function calculateEnvironmentalImpact(actionType, impactValue) {
    const impactMultipliers = {
        transport: { carbon: 0.5, water: 0, waste: 0 },
        energy: { carbon: 0.3, water: 0, waste: 0 },
        water: { carbon: 0, water: 1.0, waste: 0 },
        waste: { carbon: 0.2, water: 0, waste: 1.0 },
        food: { carbon: 0.4, water: 0.5, waste: 0.3 },
        shopping: { carbon: 0.3, water: 0.2, waste: 0.5 }
    };
    
    const multiplier = impactMultipliers[actionType] || { carbon: 0, water: 0, waste: 0 };
    
    return {
        carbonReduction: impactValue * multiplier.carbon,
        waterSaved: impactValue * multiplier.water,
        wasteReduced: impactValue * multiplier.waste
    };
}

// Update environmental metrics
function updateEnvironmentalMetrics(action) {
    userData.carbonFootprint += action.environmentalImpact.carbonReduction;
    userData.waterSaved += action.environmentalImpact.waterSaved;
    userData.wasteReduced += action.environmentalImpact.wasteReduced;
    
    // Update sustainability score
    const totalActions = userData.actions.length;
    const recentActions = userData.actions.filter(action => {
        const actionDate = new Date(action.timestamp);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return actionDate > weekAgo;
    }).length;
    
    // Calculate score based on recent activity and total impact
    const baseScore = 85;
    const actionBonus = Math.min(recentActions * 2, 15);
    userData.sustainabilityScore = Math.min(baseScore + actionBonus, 100);
}

// Check for achievements
function checkAchievements() {
    const achievements = [
        {
            id: 'first_action',
            title: 'First Step',
            description: 'Logged your first sustainable action',
            condition: () => userData.actions.length === 1,
            icon: 'fas fa-seedling'
        },
        {
            id: 'carbon_warrior',
            title: 'Carbon Warrior',
            description: 'Reduced carbon footprint by 10 kg',
            condition: () => userData.carbonFootprint >= 10,
            icon: 'fas fa-leaf'
        },
        {
            id: 'water_saver',
            title: 'Water Saver',
            description: 'Saved 50 liters of water',
            condition: () => userData.waterSaved >= 50,
            icon: 'fas fa-tint'
        },
        {
            id: 'waste_reducer',
            title: 'Waste Reducer',
            description: 'Reduced waste by 5 kg',
            condition: () => userData.wasteReduced >= 5,
            icon: 'fas fa-recycle'
        },
        {
            id: 'sustainability_champion',
            title: 'Sustainability Champion',
            description: 'Achieved 95+ sustainability score',
            condition: () => userData.sustainabilityScore >= 95,
            icon: 'fas fa-trophy'
        },
        {
            id: 'consistent_actor',
            title: 'Consistent Actor',
            description: 'Logged 7 actions in a week',
            condition: () => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                const recentActions = userData.actions.filter(action => 
                    new Date(action.timestamp) > weekAgo
                );
                return recentActions.length >= 7;
            },
            icon: 'fas fa-calendar-check'
        }
    ];
    
    achievements.forEach(achievement => {
        if (achievement.condition() && !userData.achievements.find(a => a.id === achievement.id)) {
            userData.achievements.push({
                id: achievement.id,
                title: achievement.title,
                description: achievement.description,
                icon: achievement.icon,
                earnedAt: new Date().toISOString()
            });
            
            showNotification(`Achievement Unlocked: ${achievement.title}! 🎉`, 'achievement');
        }
    });
}

// Display achievements
function displayAchievements() {
    const achievementList = document.getElementById('achievementList');
    achievementList.innerHTML = '';
    
    const recentAchievements = userData.achievements
        .sort((a, b) => new Date(b.earnedAt) - new Date(a.earnedAt))
        .slice(0, 5);
    
    if (recentAchievements.length === 0) {
        achievementList.innerHTML = '<p style="color: #666; text-align: center;">No achievements yet. Start logging actions to earn achievements!</p>';
        return;
    }
    
    recentAchievements.forEach(achievement => {
        const achievementElement = document.createElement('div');
        achievementElement.className = 'achievement-item';
        achievementElement.innerHTML = `
            <div class="achievement-icon">
                <i class="${achievement.icon}"></i>
            </div>
            <div class="achievement-content">
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
            </div>
        `;
        achievementList.appendChild(achievementElement);
    });
}

// Draw progress chart
function drawProgressChart() {
    const canvas = document.getElementById('progressChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get last 7 days of data
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
        
        const dayActions = userData.actions.filter(action => {
            const actionDate = new Date(action.timestamp);
            return actionDate >= dayStart && actionDate < dayEnd;
        });
        
        last7Days.push(dayActions.length);
    }
    
    // Draw chart
    const chartWidth = canvas.width - 40;
    const chartHeight = canvas.height - 40;
    const barWidth = chartWidth / 7;
    const maxValue = Math.max(...last7Days, 1);
    
    // Draw bars
    ctx.fillStyle = '#4caf50';
    last7Days.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = 20 + index * barWidth + barWidth * 0.1;
        const y = canvas.height - 20 - barHeight;
        
        ctx.fillRect(x, y, barWidth * 0.8, barHeight);
        
        // Draw value text
        ctx.fillStyle = '#2e7d32';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(value, x + barWidth * 0.4, y - 5);
        ctx.fillStyle = '#4caf50';
    });
    
    // Draw axis labels
    ctx.fillStyle = '#666';
    ctx.font = '10px Inter';
    ctx.textAlign = 'center';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    days.forEach((day, index) => {
        const x = 20 + index * barWidth + barWidth * 0.4;
        ctx.fillText(day, x, canvas.height - 5);
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'achievement' ? '#ff9800' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add slideOut animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(slideOutStyle);

// Export functions for global access
window.logAction = logAction; 
// Sample parts data
const sampleParts = [
    {
        id: 1,
        name: "Bracket Assembly",
        config: "Aluminum 6061, Standard Tolerance",
        image: "🔧",
        material: "aluminum",
        tolerance: "standard",
        surface: "as-machined",
        quantity: 10,
        price: 45.50
    },
    {
        id: 2,
        name: "Housing Cover",
        config: "Stainless Steel 316, Precision",
        image: "📦",
        material: "steel",
        tolerance: "precision",
        surface: "bead-blasted",
        quantity: 5,
        price: 89.99
    },
    {
        id: 3,
        name: "Gear Shaft",
        config: "Titanium Grade 5, Ultra Precision",
        image: "⚙️",
        material: "titanium",
        tolerance: "ultra",
        surface: "polished",
        quantity: 25,
        price: 156.75
    },
    {
        id: 4,
        name: "Mounting Plate",
        config: "ABS Plastic, Standard Tolerance",
        image: "📋",
        material: "plastic",
        tolerance: "standard",
        surface: "as-machined",
        quantity: 50,
        price: 12.25
    },
    {
        id: 5,
        name: "Connector Block",
        config: "Nylon 6/6, Precision",
        image: "🔌",
        material: "nylon",
        tolerance: "precision",
        surface: "as-machined",
        quantity: 15,
        price: 34.80
    },
    {
        id: 6,
        name: "Valve Body",
        config: "Stainless Steel 316, Ultra Precision",
        image: "🔘",
        material: "steel",
        tolerance: "ultra",
        surface: "anodized",
        quantity: 8,
        price: 234.50
    }
];

// Current state
let currentPart = null;
let selectedPartId = null;

// DOM elements - will be initialized in init()
let partsList, collapsedParts, materialSelect, toleranceSelect, surfaceSelect, quantityInput;
let summaryContent, aiInput, inputContent, aiSendBtn, aiDropdown, aiResponse;
let responseContent, minimizeResponse, continueChat, clearChat;
let addPartBtn, partFileInput, threejsCanvas, placeholder3d;

// Three.js variables
let scene, camera, renderer, controls, currentModel;

// Initialize the application
function init() {
    // Initialize DOM element references
    partsList = document.getElementById('partsList');
    collapsedParts = document.getElementById('collapsedParts');
    materialSelect = document.getElementById('materialSelect');
    toleranceSelect = document.getElementById('toleranceSelect');
    surfaceSelect = document.getElementById('surfaceSelect');
    quantityInput = document.getElementById('quantityInput');
    summaryContent = document.getElementById('summaryContent');
    aiInput = document.getElementById('aiInput');
    inputContent = document.getElementById('inputContent');
    aiSendBtn = document.getElementById('aiSendBtn');
    aiDropdown = document.getElementById('aiDropdown');
    aiResponse = document.getElementById('aiResponse');
    responseContent = document.getElementById('responseContent');
    minimizeResponse = document.getElementById('minimizeResponse');
    continueChat = document.getElementById('continueChat');
    clearChat = document.getElementById('clearChat');
    addPartBtn = document.getElementById('addPartBtn');
    partFileInput = document.getElementById('partFileInput');
    threejsCanvas = document.getElementById('threejsCanvas');
    placeholder3d = document.getElementById('placeholder3d');
    
    // Check if all required elements are found
    if (!partsList || !aiInput) {
        console.error('Critical DOM elements not found. Parts list:', partsList, 'AI input:', aiInput);
        return;
    }
    
    loadParts();
    setupEventListeners();
    updateSummary();
    initThreeJS();
    showQuickShortcuts();
}

// Load parts into the left sidebar
function loadParts() {
    if (!partsList || !collapsedParts) {
        console.error('Parts list elements not found');
        return;
    }
    
    partsList.innerHTML = '';
    collapsedParts.innerHTML = '';
    
    sampleParts.forEach(part => {
        const partElement = createPartElement(part);
        const collapsedPartElement = createCollapsedPartElement(part);
        partsList.appendChild(partElement);
        collapsedParts.appendChild(collapsedPartElement);
    });
}

// Create a part element for the list
function createPartElement(part) {
    const partElement = document.createElement('div');
    partElement.className = 'part-item';
    partElement.dataset.partId = part.id;
    
    partElement.innerHTML = `
        <div class="part-image">
            ${part.image}
        </div>
        <div class="part-info">
            <div class="part-name">${part.name}</div>
            <div class="part-config">${part.config}</div>
        </div>
    `;
    
    partElement.addEventListener('click', () => selectPart(part.id));
    
    return partElement;
}

// Create a collapsed part element
function createCollapsedPartElement(part) {
    const collapsedPartElement = document.createElement('div');
    collapsedPartElement.className = 'collapsed-part-item';
    collapsedPartElement.dataset.partId = part.id;
    collapsedPartElement.innerHTML = part.image;
    
    collapsedPartElement.addEventListener('click', () => selectPart(part.id));
    
    return collapsedPartElement;
}

// Select a part
function selectPart(partId) {
    // Remove previous selection
    const previousSelected = document.querySelector('.part-item.selected');
    const previousCollapsedSelected = document.querySelector('.collapsed-part-item.selected');
    if (previousSelected) {
        previousSelected.classList.remove('selected');
    }
    if (previousCollapsedSelected) {
        previousCollapsedSelected.classList.remove('selected');
    }
    
    // Add selection to current part
    const currentPartElement = document.querySelector(`[data-part-id="${partId}"]`);
    const currentCollapsedElement = document.querySelector(`.collapsed-part-item[data-part-id="${partId}"]`);
    if (currentPartElement) {
        currentPartElement.classList.add('selected');
    }
    if (currentCollapsedElement) {
        currentCollapsedElement.classList.add('selected');
    }
    
    selectedPartId = partId;
    currentPart = sampleParts.find(part => part.id === partId);
    
    // Update configuration form
    updateConfigurationForm();
    
    // Update 3D viewer
    updateViewer();
    
    // Update summary
    updateSummary();
}

// Update the configuration form with selected part data
function updateConfigurationForm() {
    if (!currentPart) return;
    
    if (materialSelect) materialSelect.value = currentPart.material;
    if (toleranceSelect) toleranceSelect.value = currentPart.tolerance;
    if (surfaceSelect) surfaceSelect.value = currentPart.surface;
    if (quantityInput) quantityInput.value = currentPart.quantity;
}

// Initialize Three.js
function initThreeJS() {
    // Skip Three.js initialization for now to prevent errors
    console.log('Three.js initialization skipped');
}

// Animation loop
function animate() {
    // Skip animation for now
}

// Update 3D viewer
function updateViewer() {
    if (!currentPart) {
        if (threejsCanvas) threejsCanvas.style.display = 'none';
        if (placeholder3d) placeholder3d.style.display = 'flex';
        return;
    }
    
    if (threejsCanvas) threejsCanvas.style.display = 'block';
    if (placeholder3d) placeholder3d.style.display = 'none';
}

// Create 3D model for part
function createPartModel(part) {
    // Skip 3D model creation for now
    return null;
}

// Get material color
function getMaterialColor(material) {
    const colors = {
        'aluminum': 0xC0C0C0,
        'steel': 0x8B8B8B,
        'titanium': 0x708090,
        'plastic': 0x87CEEB,
        'nylon': 0x4682B4
    };
    return colors[material] || 0x808080;
}

// Update summary with pricing
function updateSummary() {
    const summaryPlaceholder = document.getElementById('summaryPlaceholder');
    const summaryDetails = document.getElementById('summaryDetails');
    const productionCostEl = document.getElementById('productionCost');
    const shippingCostEl = document.getElementById('shippingCost');
    const taxCostEl = document.getElementById('taxCost');
    const orderTotalEl = document.getElementById('orderTotal');
    
    if (!currentPart) {
        if (summaryPlaceholder) summaryPlaceholder.style.display = 'block';
        if (summaryDetails) summaryDetails.style.display = 'none';
        return;
    }
    
    // Calculate pricing based on configuration
    const basePrice = calculateBasePrice(currentPart);
    const quantity = currentPart.quantity || 1;
    const productionCost = basePrice * quantity;
    const shippingCost = calculateShippingCost(productionCost);
    const taxRate = 0.085; // 8.5% tax rate
    const taxCost = (productionCost + shippingCost) * taxRate;
    const orderTotal = productionCost + shippingCost + taxCost;
    
    // Update display
    if (summaryPlaceholder) summaryPlaceholder.style.display = 'none';
    if (summaryDetails) summaryDetails.style.display = 'block';
    
    if (productionCostEl) productionCostEl.textContent = `$${productionCost.toFixed(2)}`;
    if (shippingCostEl) shippingCostEl.textContent = `$${shippingCost.toFixed(2)}`;
    if (taxCostEl) taxCostEl.textContent = `$${taxCost.toFixed(2)}`;
    if (orderTotalEl) orderTotalEl.textContent = `$${orderTotal.toFixed(2)}`;
}

// Calculate base price based on material and configuration
function calculateBasePrice(part) {
    let basePrice = 50; // Base price for simple parts
    
    // Material cost multipliers
    const materialCosts = {
        'aluminum-6061': 1.0,
        'aluminum-7075': 1.3,
        'steel-304': 1.8,
        'steel-316': 2.5,
        'titanium-grade5': 8.0,
        'plastic-abs': 0.6,
        'nylon-66': 0.8,
        // Legacy material mappings for backward compatibility
        'aluminum': 1.0,
        'steel': 2.5,
        'titanium': 8.0,
        'plastic': 0.6,
        'nylon': 0.8
    };
    
    // Tolerance cost multipliers
    const toleranceCosts = {
        'loose': 0.8,
        'standard': 1.0,
        'precision': 1.5,
        'ultra': 2.5,
        'critical': 4.0
    };
    
    // Surface finish cost multipliers
    const finishCosts = {
        'as-machined': 1.0,
        'bead-blasted': 1.2,
        'polished-standard': 1.5,
        'anodized-clear': 1.8,
        'chrome-plated': 2.5,
        'powder-coat': 1.6,
        'mirror-polish': 2.0
    };
    
    // Apply multipliers
    const materialMultiplier = materialCosts[part.material] || 1.0;
    const toleranceMultiplier = toleranceCosts[part.tolerance] || 1.0;
    const finishMultiplier = finishCosts[part.surface] || 1.0;
    
    return basePrice * materialMultiplier * toleranceMultiplier * finishMultiplier;
}

// Calculate shipping cost based on order value
function calculateShippingCost(orderValue) {
    if (orderValue < 100) {
        return 25; // Standard shipping for small orders
    } else if (orderValue < 500) {
        return 35; // Standard shipping for medium orders
    } else {
        return 45; // Standard shipping for large orders
    }
}

// Helper functions
function getMaterialName(material) {
    const names = {
        'aluminum': "Aluminum 6061",
        'steel': "Stainless Steel 316",
        'titanium': "Titanium Grade 5",
        'plastic': "ABS Plastic",
        'nylon': "Nylon 6/6"
    };
    return names[material] || material;
}

function getToleranceName(tolerance) {
    const names = {
        'standard': 'Standard (±0.1mm)',
        'precision': 'Precision (±0.05mm)',
        'ultra': 'Ultra Precision (±0.02mm)'
    };
    return names[tolerance] || tolerance;
}

function getSurfaceName(surface) {
    const names = {
        'as-machined': 'As Machined',
        'bead-blasted': 'Bead Blasted',
        'polished': 'Polished',
        'anodized': 'Anodized'
    };
    return names[surface] || surface;
}

// Setup event listeners
function setupEventListeners() {
    console.log('Setting up event listeners');
    console.log('aiInput element:', aiInput);
    
    // Configuration form changes
    if (materialSelect) materialSelect.addEventListener('change', updatePartFromForm);
    if (toleranceSelect) toleranceSelect.addEventListener('change', updatePartFromForm);
    if (surfaceSelect) surfaceSelect.addEventListener('input', updatePartFromForm);
    if (quantityInput) quantityInput.addEventListener('input', updatePartFromForm);
    
    // AI input
    if (aiInput) {
        console.log('Adding event listeners to aiInput');
        aiInput.addEventListener('input', handleAIInputChange);
        aiInput.addEventListener('keydown', handleAIKeydown);
        aiInput.addEventListener('focus', () => {
            showQuickShortcuts();
        });
    } else {
        console.error('aiInput element not found!');
    }
    if (aiSendBtn) aiSendBtn.addEventListener('click', handleAIInput);
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (aiInput && aiDropdown && !aiInput.contains(e.target) && !aiDropdown.contains(e.target)) {
            hideDropdown();
        }
    });
    
    // AI response controls
    if (minimizeResponse) minimizeResponse.addEventListener('click', toggleResponseMinimize);
    // Removed continueChat event listener - users can just type to continue conversation
    if (clearChat) clearChat.addEventListener('click', clearAIResponse);
    
    // Add part button (file upload)
    if (addPartBtn) {
        addPartBtn.addEventListener('click', () => {
            if (partFileInput) partFileInput.click();
        });
    }
    
    // File input change
    if (partFileInput) partFileInput.addEventListener('change', handleFileUpload);
    
    // Action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', handleActionButton);
    });
    
    // Viewer controls
    const viewerBtns = document.querySelectorAll('.viewer-btn');
    viewerBtns.forEach(btn => {
        btn.addEventListener('click', handleViewerControl);
    });
    
    // Bullet style toggle event delegation
    document.addEventListener('click', (e) => {
        // Handle bullet style changes
        if (e.target.classList.contains('bullet-style-btn')) {
            const style = e.target.dataset.style;
            currentBulletStyle = style;
            applyBulletPointStyling();
            
            // Update active state
            document.querySelectorAll('.bullet-style-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
        
        // Handle bullet theme changes
        if (e.target.classList.contains('bullet-theme-btn')) {
            const theme = e.target.dataset.theme;
            currentBulletTheme = theme;
            applyBulletPointStyling();
            
            // Update active state
            document.querySelectorAll('.bullet-theme-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
        
        // Handle bullet size changes
        if (e.target.classList.contains('bullet-size-btn')) {
            const size = e.target.dataset.size;
            currentBulletSize = size;
            applyBulletPointStyling();
            
            // Update active state
            document.querySelectorAll('.bullet-size-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
    
    console.log('Event listeners setup complete');
}

// Update part configuration from form
function updatePartFromForm() {
    if (!currentPart) return;
    
    if (materialSelect) currentPart.material = materialSelect.value;
    if (toleranceSelect) currentPart.tolerance = toleranceSelect.value;
    if (surfaceSelect) currentPart.surface = surfaceSelect.value;
    if (quantityInput) currentPart.quantity = parseInt(quantityInput.value) || 1;
    
    // Update part config display
    const partElement = document.querySelector(`[data-part-id="${currentPart.id}"]`);
    if (partElement) {
        const configElement = partElement.querySelector('.part-config');
        if (configElement) {
            configElement.textContent = `${getMaterialName(currentPart.material)}, ${getToleranceName(currentPart.tolerance)}`;
        }
    }
    
    updateSummary();
}

// Handle AI input change
function handleAIInputChange() {
    const query = aiInput ? aiInput.value.trim() : '';
    
    // Check for slash commands
    if (query.startsWith('/')) {
        handleSlashCommand(query);
        return;
    }
    
    // Default behavior
    updateQuickSuggestions(query);
}

// Handle slash commands
function handleSlashCommand(query) {
    const command = query.toLowerCase();
    
    if (command === '/ask') {
        showCommandConfirmation('ask', 'Ask Fictiv AI');
    } else if (command === '/configure') {
        showCommandConfirmation('configure', 'Configure for');
    } else if (command === '/help') {
        showSlashHelp();
    } else {
        showSlashSuggestions();
    }
}

// Handle AI keydown
function handleAIKeydown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleAIInput();
    } else if (e.key === 'Escape') {
        if (aiInput) aiInput.value = '';
        hideDropdown();
        removeActionPill();
    }
}

// Handle AI input
function handleAIInput() {
    const query = aiInput ? aiInput.value.trim() : '';
    if (!query) return;
    
    // Check if we have an active pill
    const pill = inputContent ? inputContent.querySelector('.action-pill') : null;
    if (pill) {
        const action = pill.classList.contains('configure') ? 'configure' : 'ask';
        
        if (action === 'configure') {
            handleConfigurationRequest(query);
        } else if (action === 'ask') {
            showAIResponseWithQuestion(query);
        }
        
        // Clear input and remove pill
        if (aiInput) aiInput.value = '';
        removeActionPill();
        return;
    }
    
    // Default to asking AI
    showAIResponseWithQuestion(query);
    
    if (aiInput) aiInput.value = '';
    hideDropdown();
}

// Show AI response with question in chat format
function showAIResponseWithQuestion(question) {
    // Show loading state first
    const loadingHTML = `
        <div class="chat-message user-message">
            <div class="message-content">
                <div class="message-header">
                    <i class="fas fa-user"></i>
                    <span>You</span>
                    <small>${new Date().toLocaleTimeString()}</small>
                </div>
                <div class="message-text">${question}</div>
            </div>
        </div>
        <div class="chat-message ai-message">
            <div class="message-content">
                <div class="message-header">
                    <i class="fas fa-robot"></i>
                    <span>Fictiv AI</span>
                    <small>${new Date().toLocaleTimeString()}</small>
                </div>
                <div class="message-text">
                    <div class="ai-thinking">
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>Thinking...</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Update response content with loading state
    if (responseContent) {
        if (responseContent.innerHTML.trim() === '') {
            responseContent.innerHTML = loadingHTML;
        } else {
            responseContent.innerHTML += loadingHTML;
        }
    }
    
    // Show and expand the response area
    if (aiResponse) {
        aiResponse.style.display = 'block';
        aiResponse.classList.add('expanded');
        
        // Scroll to bottom to show loading state
        setTimeout(() => {
            if (responseContent) {
                responseContent.scrollTop = responseContent.scrollHeight;
            }
        }, 100);
    }
    
    // Simulate AI thinking time (1-2 seconds)
    setTimeout(() => {
        // Get AI response
        const aiResponseText = handleExpertQuestion(question);
        
        // Replace loading with actual response
        const actualResponseHTML = `
            <div class="chat-message user-message">
                <div class="message-content">
                    <div class="message-header">
                        <i class="fas fa-user"></i>
                        <span>You</span>
                        <small>${new Date().toLocaleTimeString()}</small>
                    </div>
                    <div class="message-text">${question}</div>
                </div>
            </div>
            <div class="chat-message ai-message">
                <div class="message-content">
                    <div class="message-header">
                        <i class="fas fa-robot"></i>
                        <span>Fictiv AI</span>
                        <small>${new Date().toLocaleTimeString()}</small>
                    </div>
                    <div class="ai-response-content-wrapper">
                        ${aiResponseText}
                    </div>
                </div>
            </div>
        `;
        
        // Update with actual response
        if (responseContent) {
            if (responseContent.innerHTML.includes('ai-thinking')) {
                // Replace the last AI message (loading) with actual response
                const messages = responseContent.querySelectorAll('.chat-message');
                if (messages.length >= 2) {
                    const lastUserMessage = messages[messages.length - 2];
                    const lastAIMessage = messages[messages.length - 1];
                    
                    // Keep the user message, replace the AI message
                    const newAIMessageHTML = actualResponseHTML.split('<div class="chat-message ai-message">')[1];
                    lastAIMessage.outerHTML = newAIMessageHTML;
                }
            } else {
                responseContent.innerHTML = actualResponseHTML;
            }
        }
        
        // Scroll to bottom to show final response
        setTimeout(() => {
            if (responseContent) {
                responseContent.scrollTop = responseContent.scrollHeight;
            }
        }, 100);
    }, 1000 + Math.random() * 1000);
}

// Handle expert questions
function handleExpertQuestion(question) {
    if (!question) return "I'm here to help! Please ask me a question about materials, manufacturing, or part configuration.";
    
    const lowerQuestion = question.toLowerCase();
    
    // Material questions
    if (lowerQuestion.includes('material') || lowerQuestion.includes('what material')) {
        return getEnhancedMaterialResponse();
    }
    
    // Finish questions
    if (lowerQuestion.includes('finish') || lowerQuestion.includes('surface')) {
        return `
            <div class="ai-response-content">
                <div class="response-header-section">
                    <h3><i class="fas fa-paint-brush"></i> Surface Finish Options</h3>
                    <p class="response-subtitle">Choose the right finish for your needs:</p>
                </div>
                
                <div class="finish-categories">
                    <div class="finish-category">
                        <h4><i class="fas fa-dollar-sign"></i> Cost-Effective Finishes</h4>
                        <div class="finish-options">
                            <div class="finish-option">
                                <span class="finish-name">As Machined</span>
                                <span class="finish-desc">Standard finish, most economical</span>
                            </div>
                            <div class="finish-option">
                                <span class="finish-name">Bead Blasted</span>
                                <span class="finish-desc">Uniform matte finish, hides machining marks</span>
                            </div>
                            <div class="finish-option">
                                <span class="finish-name">Sand Blasted</span>
                                <span class="finish-desc">Textured finish, good for grip</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="finish-category">
                        <h4><i class="fas fa-eye"></i> Appearance Finishes</h4>
                        <div class="finish-options">
                            <div class="finish-option">
                                <span class="finish-name">Polished</span>
                                <span class="finish-desc">Smooth, reflective finish, excellent appearance</span>
                            </div>
                            <div class="finish-option">
                                <span class="finish-name">Brushed</span>
                                <span class="finish-desc">Linear texture, modern look</span>
                            </div>
                            <div class="finish-option">
                                <span class="finish-name">Mirror Polish</span>
                                <span class="finish-desc">Highly reflective, premium appearance</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="finish-category">
                        <h4><i class="fas fa-shield-alt"></i> Protective Finishes</h4>
                        <div class="finish-options">
                            <div class="finish-option">
                                <span class="finish-name">Anodized</span>
                                <span class="finish-desc">Corrosion protection + color options (aluminum only)</span>
                            </div>
                            <div class="finish-option">
                                <span class="finish-name">Chrome Plated</span>
                                <span class="finish-desc">Hard, decorative finish</span>
                            </div>
                            <div class="finish-option">
                                <span class="finish-name">Nickel Plated</span>
                                <span class="finish-desc">Corrosion resistance, decorative</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="finish-category">
                        <h4><i class="fas fa-magic"></i> Specialty Finishes</h4>
                        <div class="finish-options">
                            <div class="finish-option">
                                <span class="finish-name">Powder Coat</span>
                                <span class="finish-desc">Durable, wide color selection</span>
                            </div>
                            <div class="finish-option">
                                <span class="finish-name">PVD Coating</span>
                                <span class="finish-desc">Hard, decorative, wear-resistant</span>
                            </div>
                            <div class="finish-option">
                                <span class="finish-name">Ceramic Coating</span>
                                <span class="finish-desc">Ultra-hard, chemical resistant</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="response-footer">
                    <div class="next-step">
                        <i class="fas fa-question-circle"></i>
                        <strong>What's your priority:</strong> cost, appearance, or functionality?
                    </div>
                </div>
            </div>
        `;
    }
    
    // Tolerance questions
    if (lowerQuestion.includes('tolerance') || lowerQuestion.includes('precision')) {
        return `
            <div class="ai-response-content">
                <div class="response-header-section">
                    <h3><i class="fas fa-ruler-combined"></i> Tolerance Levels</h3>
                    <p class="response-subtitle">Choose the right precision for your application:</p>
                </div>
                
                <div class="tolerance-cards">
                    <div class="tolerance-card">
                        <div class="tolerance-header">
                            <div class="tolerance-icon">📏</div>
                            <h4>Standard (±0.1mm)</h4>
                            <span class="cost-badge cost-low">Most Economical</span>
                        </div>
                        <div class="tolerance-details">
                            <div class="detail-item">
                                <i class="fas fa-check-circle"></i>
                                <span><strong>Best for:</strong> Most general applications</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-dollar-sign"></i>
                                <span><strong>Cost:</strong> Most economical</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-cogs"></i>
                                <span><strong>Applications:</strong> Consumer products, prototypes, non-critical parts</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-tools"></i>
                                <span><strong>Typical use:</strong> Housings, brackets, general components</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tolerance-card">
                        <div class="tolerance-header">
                            <div class="tolerance-icon">🎯</div>
                            <h4>Precision (±0.05mm)</h4>
                            <span class="cost-badge cost-medium">Moderate Increase</span>
                        </div>
                        <div class="tolerance-details">
                            <div class="detail-item">
                                <i class="fas fa-check-circle"></i>
                                <span><strong>Best for:</strong> Assembly parts, mechanical components</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-dollar-sign"></i>
                                <span><strong>Cost:</strong> Moderate increase</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-cogs"></i>
                                <span><strong>Applications:</strong> Gears, bearings, mating parts</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-tools"></i>
                                <span><strong>Typical use:</strong> Automotive, machinery, precision assemblies</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tolerance-card">
                        <div class="tolerance-header">
                            <div class="tolerance-icon">🔬</div>
                            <h4>Ultra Precision (±0.02mm)</h4>
                            <span class="cost-badge cost-high">Significant Increase</span>
                        </div>
                        <div class="tolerance-details">
                            <div class="detail-item">
                                <i class="fas fa-check-circle"></i>
                                <span><strong>Best for:</strong> Critical applications, tight fits</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-dollar-sign"></i>
                                <span><strong>Cost:</strong> Significant increase</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-cogs"></i>
                                <span><strong>Applications:</strong> Medical devices, aerospace, instrumentation</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-tools"></i>
                                <span><strong>Typical use:</strong> Surgical instruments, measurement devices</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="tolerance-card">
                        <div class="tolerance-header">
                            <div class="tolerance-icon">⚡</div>
                            <h4>Critical (±0.005mm)</h4>
                            <span class="cost-badge cost-very-high">Highest Cost</span>
                        </div>
                        <div class="tolerance-details">
                            <div class="detail-item">
                                <i class="fas fa-check-circle"></i>
                                <span><strong>Best for:</strong> Ultra-critical applications</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-dollar-sign"></i>
                                <span><strong>Cost:</strong> Highest</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-cogs"></i>
                                <span><strong>Applications:</strong> Metrology, research, specialized equipment</span>
                            </div>
                            <div class="detail-item">
                                <i class="fas fa-tools"></i>
                                <span><strong>Typical use:</strong> Calibration standards, research instruments</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="response-footer">
                    <div class="next-step">
                        <i class="fas fa-question-circle"></i>
                        <strong>What's your application's precision requirement?</strong>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Manufacturing process questions
    if (lowerQuestion.includes('manufacturing') || lowerQuestion.includes('process') || lowerQuestion.includes('how to make')) {
        return `
            <div class="ai-response-content">
                <div class="response-header-section">
                    <h3><i class="fas fa-industry"></i> Manufacturing Process Guide</h3>
                    <p class="response-subtitle">Choose the right process for your part:</p>
                </div>
                
                <div class="process-cards">
                    <div class="process-card">
                        <div class="process-header">
                            <div class="process-icon">🔧</div>
                            <h4>CNC Machining</h4>
                            <span class="process-badge process-excellent">Excellent Quality</span>
                        </div>
                        <div class="process-details">
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <i class="fas fa-star"></i>
                                    <span><strong>Best for:</strong> Complex geometries, tight tolerances</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-cube"></i>
                                    <span><strong>Materials:</strong> Metals, plastics, composites</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-clock"></i>
                                    <span><strong>Lead time:</strong> 1-3 weeks</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span><strong>Cost:</strong> Medium to high</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-award"></i>
                                    <span><strong>Quality:</strong> Excellent surface finish, precise tolerances</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="process-card">
                        <div class="process-header">
                            <div class="process-icon">🖨️</div>
                            <h4>3D Printing</h4>
                            <span class="process-badge process-good">Good for Prototypes</span>
                        </div>
                        <div class="process-details">
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <i class="fas fa-star"></i>
                                    <span><strong>Best for:</strong> Prototypes, complex internal structures</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-cube"></i>
                                    <span><strong>Materials:</strong> Plastics, resins, some metals</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-clock"></i>
                                    <span><strong>Lead time:</strong> 1-7 days</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span><strong>Cost:</strong> Low to medium</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-award"></i>
                                    <span><strong>Quality:</strong> Good for prototypes, limited strength</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="process-card">
                        <div class="process-header">
                            <div class="process-icon">📋</div>
                            <h4>Sheet Metal</h4>
                            <span class="process-badge process-good">Good for Flat Parts</span>
                        </div>
                        <div class="process-details">
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <i class="fas fa-star"></i>
                                    <span><strong>Best for:</strong> Enclosures, brackets, flat parts</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-cube"></i>
                                    <span><strong>Materials:</strong> Steel, aluminum, brass</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-clock"></i>
                                    <span><strong>Lead time:</strong> 1-2 weeks</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span><strong>Cost:</strong> Low to medium</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-award"></i>
                                    <span><strong>Quality:</strong> Good for flat parts, limited complexity</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="process-card">
                        <div class="process-header">
                            <div class="process-icon">🏭</div>
                            <h4>Injection Molding</h4>
                            <span class="process-badge process-excellent">Excellent for Mass Production</span>
                        </div>
                        <div class="process-details">
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <i class="fas fa-star"></i>
                                    <span><strong>Best for:</strong> High-volume plastic parts</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-cube"></i>
                                    <span><strong>Materials:</strong> Thermoplastics</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-clock"></i>
                                    <span><strong>Lead time:</strong> 4-8 weeks (tooling)</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-dollar-sign"></i>
                                    <span><strong>Cost:</strong> High initial, low per-part</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-award"></i>
                                    <span><strong>Quality:</strong> Excellent for mass production</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="response-footer">
                    <div class="next-step">
                        <i class="fas fa-question-circle"></i>
                        <strong>What type of part are you making?</strong>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Cost questions
    if (lowerQuestion.includes('cost') || lowerQuestion.includes('price') || lowerQuestion.includes('expensive')) {
        return `
            <div class="ai-response-content">
                <div class="response-header-section">
                    <h3><i class="fas fa-chart-line"></i> Cost Optimization Guide</h3>
                    <p class="response-subtitle">Understand what drives costs and how to optimize:</p>
                </div>
                
                <div class="cost-sections">
                    <div class="cost-section">
                        <h4><i class="fas fa-cube"></i> Material Cost Factors</h4>
                        <div class="cost-grid">
                            <div class="cost-item">
                                <span class="material-name">Aluminum 6061</span>
                                <span class="cost-range cost-low">$2-5/lb</span>
                                <span class="cost-note">Most economical</span>
                            </div>
                            <div class="cost-item">
                                <span class="material-name">Stainless Steel 316</span>
                                <span class="cost-range cost-medium">$8-15/lb</span>
                                <span class="cost-note">Moderate</span>
                            </div>
                            <div class="cost-item">
                                <span class="material-name">Titanium Grade 5</span>
                                <span class="cost-range cost-high">$25-50/lb</span>
                                <span class="cost-note">Expensive</span>
                            </div>
                            <div class="cost-item">
                                <span class="material-name">ABS Plastic</span>
                                <span class="cost-range cost-low">$1-3/lb</span>
                                <span class="cost-note">Very economical</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cost-section">
                        <h4><i class="fas fa-cogs"></i> Manufacturing Cost Factors</h4>
                        <div class="factor-list">
                            <div class="factor-item">
                                <i class="fas fa-sort-numeric-up"></i>
                                <span><strong>Quantity:</strong> Higher volumes = lower per-part cost</span>
                            </div>
                            <div class="factor-item">
                                <i class="fas fa-shapes"></i>
                                <span><strong>Complexity:</strong> Simple shapes = lower machining cost</span>
                            </div>
                            <div class="factor-item">
                                <i class="fas fa-ruler-combined"></i>
                                <span><strong>Tolerances:</strong> Tighter tolerances = higher cost</span>
                            </div>
                            <div class="factor-item">
                                <i class="fas fa-paint-brush"></i>
                                <span><strong>Surface finish:</strong> Special finishes add 20-50% cost</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="cost-section">
                        <h4><i class="fas fa-lightbulb"></i> Cost-Saving Tips</h4>
                        <div class="tips-list">
                            <div class="tip-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Use standard materials when possible</span>
                            </div>
                            <div class="tip-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Simplify geometry to reduce machining time</span>
                            </div>
                            <div class="tip-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Consider 3D printing for prototypes</span>
                            </div>
                            <div class="tip-item">
                                <i class="fas fa-check-circle"></i>
                                <span>Order in larger quantities for better pricing</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="response-footer">
                    <div class="next-step">
                        <i class="fas fa-question-circle"></i>
                        <strong>What's your budget range?</strong>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Default response
    return `
        <div class="ai-response-content">
            <div class="response-header-section">
                <h3><i class="fas fa-robot"></i> I'm your expert mechanical engineering assistant!</h3>
                <p class="response-subtitle">Here's how I can help you:</p>
            </div>
            
            <div class="expertise-grid">
                <div class="expertise-card">
                    <div class="expertise-icon">🔧</div>
                    <h4>Material Selection</h4>
                    <ul>
                        <li>Aluminum, Steel, Titanium, Plastics</li>
                        <li>Material properties and applications</li>
                        <li>Cost vs. performance trade-offs</li>
                    </ul>
                </div>
                
                <div class="expertise-card">
                    <div class="expertise-icon">🏭</div>
                    <h4>Manufacturing Processes</h4>
                    <ul>
                        <li>CNC Machining, 3D Printing, Sheet Metal</li>
                        <li>Process selection and optimization</li>
                        <li>Lead times and cost factors</li>
                    </ul>
                </div>
                
                <div class="expertise-card">
                    <div class="expertise-icon">📐</div>
                    <h4>Design Considerations</h4>
                    <ul>
                        <li>Tolerances, Finishes, Cost Optimization</li>
                        <li>Design for manufacturability</li>
                        <li>Quality and reliability factors</li>
                    </ul>
                </div>
                
                <div class="expertise-card">
                    <div class="expertise-icon">✅</div>
                    <h4>Quality Assurance</h4>
                    <ul>
                        <li>Inspection methods and standards</li>
                        <li>Testing procedures and certifications</li>
                        <li>Quality control best practices</li>
                    </ul>
                </div>
            </div>
            
            <div class="response-footer">
                <div class="next-step">
                    <i class="fas fa-comment"></i>
                    <strong>Ask me about any specific aspect of mechanical engineering, materials, or manufacturing!</strong>
                </div>
            </div>
        </div>
    `;
}

// Handle configuration requests
function handleConfigurationRequest(query) {
    const lowerQuery = query.toLowerCase();
    let material = null;
    let tolerance = null;
    let surface = null;
    
    // Extract material
    if (lowerQuery.includes('6061') || lowerQuery.includes('aluminum')) {
        material = 'aluminum-6061';
    } else if (lowerQuery.includes('7075') || lowerQuery.includes('aluminum')) {
        material = 'aluminum-7075';
    } else if (lowerQuery.includes('304') || lowerQuery.includes('steel')) {
        material = 'steel-304';
    } else if (lowerQuery.includes('316') || lowerQuery.includes('steel')) {
        material = 'steel-316';
    } else if (lowerQuery.includes('titanium')) {
        material = 'titanium-grade5';
    } else if (lowerQuery.includes('abs') || lowerQuery.includes('plastic')) {
        material = 'plastic-abs';
    }
    
    // Extract tolerance
    if (lowerQuery.includes('standard')) {
        tolerance = 'standard';
    } else if (lowerQuery.includes('precision')) {
        tolerance = 'precision';
    } else if (lowerQuery.includes('ultra')) {
        tolerance = 'ultra';
    }
    
    // Extract surface finish
    if (lowerQuery.includes('anodized')) {
        surface = 'anodized-clear';
    } else if (lowerQuery.includes('polished')) {
        surface = 'polished-standard';
    } else if (lowerQuery.includes('bead blasted')) {
        surface = 'bead-blasted';
    }
    
    // Update form
    if (material && materialSelect) materialSelect.value = material;
    if (tolerance && toleranceSelect) toleranceSelect.value = tolerance;
    if (surface && surfaceSelect) surfaceSelect.value = surface;
    
    updatePartFromForm();
    
    // Don't show AI response for configuration - just update the form silently
    // The form updates will be visible in the manual configuration section
}

// Configure material from selector buttons
function configureMaterial(materialType) {
    let material = '';
    let tolerance = 'standard';
    let surface = 'as-machined';
    
    // Set material and default properties based on selection
    switch (materialType) {
        case '6061':
            material = 'aluminum-6061';
            surface = 'anodized-clear';
            break;
        case '7075':
            material = 'aluminum-7075';
            surface = 'anodized-clear';
            break;
        case '304':
            material = 'steel-304';
            surface = 'bead-blasted';
            break;
        case '316':
            material = 'steel-316';
            surface = 'polished-standard';
            break;
        case 'titanium':
            material = 'titanium-grade5';
            surface = 'polished-standard';
            break;
        default:
            material = 'aluminum-6061';
    }
    
    // Update form if elements exist
    if (materialSelect) materialSelect.value = material;
    if (toleranceSelect) toleranceSelect.value = tolerance;
    if (surfaceSelect) surfaceSelect.value = surface;
    
    // Update part configuration
    if (currentPart) {
        currentPart.material = material;
        currentPart.tolerance = tolerance;
        currentPart.surface = surface;
        updatePartFromForm();
    }
    
    // Show confirmation message
    showAIResponse(`
        <div class="ai-response-content">
            <div class="response-header-section">
                <h3><i class="fas fa-check-circle"></i> Material Configured!</h3>
                <p class="response-subtitle">${getMaterialDisplayName(material)} has been selected with ${getToleranceName(tolerance)} tolerance and ${getSurfaceName(surface)} finish.</p>
            </div>
            
            <div class="configuration-summary">
                <div class="config-item">
                    <i class="fas fa-cube"></i>
                    <span><strong>Material:</strong> ${getMaterialDisplayName(material)}</span>
                </div>
                <div class="config-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span><strong>Tolerance:</strong> ${getToleranceName(tolerance)}</span>
                </div>
                <div class="config-item">
                    <i class="fas fa-paint-brush"></i>
                    <span><strong>Surface:</strong> ${getSurfaceName(surface)}</span>
                </div>
            </div>
            
            <div class="response-footer">
                <div class="next-step">
                    <i class="fas fa-edit"></i>
                    <strong>Adjust tolerance or surface finish in the configuration panel, or ask me about other options!</strong>
                </div>
            </div>
        </div>
    `);
}

// Get display name for materials
function getMaterialDisplayName(material) {
    const names = {
        'aluminum-6061': 'Aluminum 6061-T6',
        'aluminum-7075': 'Aluminum 7075-T6',
        'steel-304': 'Stainless Steel 304',
        'steel-316': 'Stainless Steel 316',
        'titanium-grade5': 'Titanium Grade 5',
        'plastic-abs': 'ABS Plastic',
        'nylon-66': 'Nylon 6/6'
    };
    return names[material] || material;
}

// Show AI response
function showAIResponse(message) {
    if (responseContent) {
        responseContent.innerHTML = `
            <div class="chat-message ai-message">
                <div class="message-content">
                    <div class="message-header">
                        <i class="fas fa-robot"></i>
                        <span>Fictiv AI</span>
                        <small>${new Date().toLocaleTimeString()}</small>
                    </div>
                    <div class="ai-response-content-wrapper">
                        ${message}
                    </div>
                </div>
            </div>
        `;
    }
    
    if (aiResponse) {
        aiResponse.style.display = 'block';
        aiResponse.classList.add('expanded');
    }
}

// Simple utility functions
function hideDropdown() {
    if (aiDropdown) {
        aiDropdown.style.display = 'none';
    }
}

function showDropdown() {
    if (aiDropdown) {
        aiDropdown.style.display = 'block';
    }
}

function removeActionPill() {
    if (inputContent) {
        const pill = inputContent.querySelector('.action-pill');
        if (pill) {
            pill.remove();
        }
    }
}

function showQuickShortcuts() {
    if (aiDropdown) {
        aiDropdown.innerHTML = `
            <div class="dropdown-item">
                <i class="fas fa-slash"></i>
                <span>Type / for commands</span>
            </div>
        `;
        showDropdown();
    }
}

function showSlashSuggestions() {
    if (aiDropdown) {
        aiDropdown.innerHTML = `
            <div class="dropdown-item slash-help">
                <div class="command">/ask</div>
                <div class="description">Ask Fictiv AI a question</div>
            </div>
            <div class="dropdown-item slash-help">
                <div class="command">/configure</div>
                <div class="description">Configure parts and materials</div>
            </div>
            <div class="dropdown-item slash-help">
                <div class="command">/help</div>
                <div class="description">Show all available commands</div>
            </div>
        `;
        showDropdown();
    }
}

function showCommandConfirmation(command, title) {
    if (aiDropdown) {
        aiDropdown.innerHTML = `
            <div class="dropdown-item command-confirm">
                <i class="fas fa-check"></i>
                <span>${title}</span>
            </div>
        `;
        showDropdown();
    }
    
    // Create the action pill
    createActionPill(command);
    
    // Clear the input
    if (aiInput) aiInput.value = '';
}

function showSlashHelp() {
    if (aiDropdown) {
        aiDropdown.innerHTML = `
            <div class="dropdown-item slash-help">
                <div class="command">/ask</div>
                <div class="description">Ask Fictiv AI a question</div>
            </div>
            <div class="dropdown-item slash-help">
                <div class="command">/configure</div>
                <div class="description">Configure parts and materials</div>
            </div>
            <div class="dropdown-item slash-help">
                <div class="command">/help</div>
                <div class="description">Show this help</div>
            </div>
        `;
        showDropdown();
    }
}

function updateQuickSuggestions(query) {
    // Simple implementation - just hide dropdown for now
    hideDropdown();
}

// Create action pill function
function createActionPill(action) {
    removeActionPill(); // Remove existing pill
    
    const pill = document.createElement('div');
    pill.className = `action-pill ${action}`;
    pill.innerHTML = `
        <span>${action === 'configure' ? 'Configure for' : 'Ask Fictiv AI'}</span>
        <button class="remove-btn">
            <i class="fas fa-times"></i>
        </button>
    `;
    // Add remove functionality
    const removeBtn = pill.querySelector('.remove-btn');
    removeBtn.addEventListener('click', removeActionPill);
    
    if (inputContent && aiInput) {
        inputContent.insertBefore(pill, aiInput);
        aiInput.focus();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Missing functions needed for the interface to work
function toggleResponseMinimize() {
    if (aiResponse) {
        aiResponse.classList.toggle('minimized');
        if (aiResponse.classList.contains('minimized')) {
            aiResponse.style.display = 'none';
        } else {
            aiResponse.style.display = 'block';
        }
    }
}

// Removed continueChatFunction - users can just type to continue conversation

function clearAIResponse() {
    if (aiResponse) aiResponse.style.display = 'none';
    if (aiResponse) aiResponse.classList.remove('expanded');
    if (responseContent) responseContent.innerHTML = '';
    if (aiInput) aiInput.value = '';
    hideDropdown();
    removeActionPill();
}

function toggleSidebar() {
    const leftSidebar = document.querySelector('.left-sidebar');
    if (leftSidebar) {
        leftSidebar.classList.toggle('collapsed');
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Simple file upload handling
    showAIResponse(`File uploaded: ${file.name}`);
    event.target.value = '';
}

function handleActionButton(e) {
    const buttonText = e.target.textContent.trim();
    
    if (buttonText.includes('Review DFM')) {
        alert('Opening Design for Manufacturing review...');
    } else if (buttonText.includes('Upload Drawing')) {
        alert('Opening file upload dialog...');
    }
}

function handleViewerControl(e) {
    const button = e.target.closest('.viewer-btn');
    if (!button) return;
    
    const title = button.getAttribute('title');
    
    if (title === 'Reset View') {
        alert('Resetting 3D view...');
    } else if (title === 'Toggle Wireframe') {
        alert('Toggling wireframe mode...');
    }
}

// Bullet point style management
let currentBulletStyle = 'default';
let currentBulletTheme = 'blue';
let currentBulletSize = 'medium';

// Bullet point style options
const bulletStyles = {
    default: { class: '', name: 'Default Bullets' },
    dash: { class: 'style-dash', name: 'Dashes' },
    arrow: { class: 'style-arrow', name: 'Arrows' },
    check: { class: 'style-check', name: 'Checkmarks' },
    star: { class: 'style-star', name: 'Stars' },
    diamond: { class: 'style-diamond', name: 'Diamonds' },
    circle: { class: 'style-circle', name: 'Circles' },
    numbered: { class: 'style-numbered', name: 'Numbers' }
};

const bulletThemes = {
    blue: { class: 'theme-blue', name: 'Blue' },
    green: { class: 'theme-green', name: 'Green' },
    purple: { class: 'theme-purple', name: 'Purple' },
    orange: { class: 'theme-orange', name: 'Orange' },
    red: { class: 'theme-red', name: 'Red' },
    gray: { class: 'theme-gray', name: 'Gray' }
};

const bulletSizes = {
    small: { class: 'size-small', name: 'Small' },
    medium: { class: '', name: 'Medium' },
    large: { class: 'size-large', name: 'Large' }
};

// Function to create bullet style toggle controls
function createBulletStyleToggle() {
    return `
        <div class="bullet-style-toggle">
            <div class="toggle-section">
                <span class="toggle-label">Style:</span>
                <div class="toggle-buttons">
                    ${Object.entries(bulletStyles).map(([key, style]) => 
                        `<button class="bullet-style-btn ${key === currentBulletStyle ? 'active' : ''}" 
                         data-style="${key}" title="${style.name}">
                            ${getBulletStylePreview(key)}
                         </button>`
                    ).join('')}
                </div>
            </div>
            <div class="toggle-section">
                <span class="toggle-label">Theme:</span>
                <div class="toggle-buttons">
                    ${Object.entries(bulletThemes).map(([key, theme]) => 
                        `<button class="bullet-theme-btn ${key === currentBulletTheme ? 'active' : ''}" 
                         data-theme="${key}" title="${theme.name}">
                            <span class="theme-preview theme-${key}">●</span>
                         </button>`
                    ).join('')}
                </div>
            </div>
            <div class="toggle-section">
                <span class="toggle-label">Size:</span>
                <div class="toggle-buttons">
                    ${Object.entries(bulletSizes).map(([key, size]) => 
                        `<button class="bullet-size-btn ${key === currentBulletSize ? 'active' : ''}" 
                         data-size="${key}" title="${size.name}">
                            ${getBulletSizePreview(key)}
                         </button>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// Function to get bullet style preview
function getBulletStylePreview(style) {
    const previews = {
        default: '•',
        dash: '—',
        arrow: '→',
        check: '✓',
        star: '★',
        diamond: '◆',
        circle: '●',
        numbered: '1'
    };
    return previews[style] || '•';
}

// Function to get bullet size preview
function getBulletSizePreview(size) {
    const previews = {
        small: '<small>•</small>',
        medium: '•',
        large: '<big>•</big>'
    };
    return previews[size] || '•';
}

// Function to apply bullet point styling
function applyBulletPointStyling() {
    const materialBullets = document.querySelectorAll('.material-bullets');
    materialBullets.forEach(bulletList => {
        // Remove existing style classes
        bulletList.classList.remove(...Object.values(bulletStyles).map(s => s.class));
        bulletList.classList.remove(...Object.values(bulletThemes).map(t => t.class));
        bulletList.classList.remove(...Object.values(bulletSizes).map(s => s.class));
        
        // Add current style classes
        if (currentBulletStyle !== 'default') {
            bulletList.classList.add(bulletStyles[currentBulletStyle].class);
        }
        if (currentBulletTheme !== 'blue') {
            bulletList.classList.add(bulletThemes[currentBulletTheme].class);
        }
        if (currentBulletSize !== 'medium') {
            bulletList.classList.add(bulletSizes[currentBulletSize].class);
        }
    });
}

// Function to create enhanced bullet points with descriptions and tags
function createEnhancedBulletPoint(text, description = '', tags = [], icon = '', clickable = false, actions = []) {
    let html = '<li';
    
    if (description) html += ' class="with-description"';
    if (tags.length > 0) html += ' class="with-tags"';
    if (icon) html += ' class="with-icon"';
    if (clickable) html += ' class="clickable"';
    if (actions.length > 0) html += ' class="with-actions"';
    
    html += '>';
    
    if (icon) {
        html += `<i class="fas fa-${icon}"></i>`;
    }
    
    html += `<span>${text}</span>`;
    
    if (description) {
        html += `<div class="description">${description}</div>`;
    }
    
    if (tags.length > 0) {
        html += '<div class="tags">';
        tags.forEach(tag => {
            html += `<span class="tag">${tag}</span>`;
        });
        html += '</div>';
    }
    
    if (actions.length > 0) {
        html += '<div class="actions">';
        actions.forEach(action => {
            html += `<button class="action-btn" onclick="${action.onclick}" title="${action.title}">${action.text}</button>`;
        });
        html += '</div>';
    }
    
    html += '</li>';
    return html;
}

// Enhanced material response with better bullet points
function getEnhancedMaterialResponse() {
    return `
        <div class="ai-response-content">
            <div class="response-header-section">
                <h3><i class="fas fa-cube"></i> Material Selection Guide</h3>
                <p class="response-subtitle">Here are the best materials for your application:</p>
            </div>
            
            ${createBulletStyleToggle()}
            
            <div class="material-overview">
                <div class="material-descriptions">
                    <h4><i class="fas fa-list"></i> Material Characteristics:</h4>
                    <ul class="material-bullets">
                        ${createEnhancedBulletPoint(
                            '<strong>1018 Steel:</strong> Low-stress applications, cost-effective',
                            'Ideal for structural components, brackets, and general purpose parts',
                            ['Economical', 'Good Strength'],
                            'cog',
                            true
                        )}
                        ${createEnhancedBulletPoint(
                            '<strong>6061-T6:</strong> General purpose aluminum, good strength-to-weight',
                            'Excellent for aerospace, automotive, and consumer applications',
                            ['Lightweight', 'Corrosion Resistant'],
                            'plane',
                            true
                        )}
                        ${createEnhancedBulletPoint(
                            '<strong>304 SS:</strong> Moderate corrosion resistance, versatile',
                            'Perfect for food processing, medical, and marine environments',
                            ['Corrosion Resistant', 'Hygienic'],
                            'shield-alt',
                            true
                        )}
                        ${createEnhancedBulletPoint(
                            '<strong>Brass 360:</strong> Easy machining, good conductivity',
                            'Great for electrical components and decorative parts',
                            ['Conductive', 'Easy Machining'],
                            'bolt',
                            true
                        )}
                        ${createEnhancedBulletPoint(
                            '<strong>ABS Plastic:</strong> Lightweight, impact resistant',
                            'Excellent for prototypes, housings, and consumer products',
                            ['Lightweight', 'Impact Resistant'],
                            'cube',
                            true
                        )}
                    </ul>
                </div>
                
                <div class="primary-requirement">
                    <p><strong>What's your primary requirement: strength, weight, corrosion resistance, or cost?</strong></p>
                </div>
                
                <div class="material-selectors">
                    <h4><i class="fas fa-cog"></i> Configure Specific Materials:</h4>
                    <div class="selector-buttons">
                        <button class="material-selector-btn" onclick="configureMaterial('6061')">
                            <i class="fas fa-cog"></i> Configure 6061
                        </button>
                        <button class="material-selector-btn" onclick="configureMaterial('7075')">
                            <i class="fas fa-cog"></i> Configure 7075
                        </button>
                        <button class="material-selector-btn" onclick="configureMaterial('304')">
                            <i class="fas fa-cog"></i> Configure 304 Steel
                        </button>
                        <button class="material-selector-btn" onclick="configureMaterial('316')">
                            <i class="fas fa-cog"></i> Configure 316 Steel
                        </button>
                        <button class="material-selector-btn" onclick="configureMaterial('titanium')">
                            <i class="fas fa-cog"></i> Configure Titanium
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="response-footer">
                <div class="next-step">
                    <i class="fas fa-lightbulb"></i>
                    <strong>Choose a material above to configure it, or ask me about specific properties!</strong>
                </div>
            </div>
        </div>
    `;
}
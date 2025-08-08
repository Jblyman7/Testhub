# Parts Configurator Interface

A modern, responsive web application for configuring and managing parts with AI assistance. This interface provides a flexible three-panel layout similar to the Google Notebook LM interface.

## Features

### Left Sidebar - Parts List
- Displays uploaded parts with names and configurations
- Shows part images/icons
- Click to select and configure parts
- Add new parts with the "+" button

### Center Panel - Configuration
- **AI Configuration Assistant**: Ask AI about materials, tolerances, or configurations
- **Manual Configuration**: Set materials, tolerances, surface finishes, and quantities
- **Quote Management**: Name and manage your quotes

### Right Sidebar - 3D Viewer & Summary
- **3D Model Viewer**: View selected parts in 3D (placeholder for integration)
- **Action Buttons**: Review DFM, upload drawings
- **Part Summary**: Shows pricing and configuration details

## Getting Started

1. Open `index.html` in a modern web browser
2. The application will load with sample parts
3. Click on any part in the left sidebar to select it
4. Use the AI assistant or manual configuration options
5. View pricing and details in the summary card

## AI Assistant Usage

The AI assistant can help configure parts based on requirements:

- **High Temperature**: "Configure for high temperature resistance"
- **Medical Grade**: "Configure for medical grade materials"
- **Aerospace**: "Configure for aerospace standards"
- **Cost Effective**: "Configure for cost effective production"

## Manual Configuration

You can manually configure:
- **Material**: Aluminum 6061, Stainless Steel 316, Titanium Grade 5, ABS Plastic, Nylon 6/6
- **Tolerance**: Standard (±0.1mm), Precision (±0.05mm), Ultra Precision (±0.01mm)
- **Surface Finish**: As Machined, Bead Blasted, Anodized, Polished
- **Quantity**: Set the number of parts needed

## Responsive Design

The interface is fully responsive and works on:
- Desktop computers (full three-panel layout)
- Tablets (adaptive layout)
- Mobile devices (stacked layout)

## File Structure

```
parts-configurator/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Future Enhancements

- Integration with real 3D model viewers (Three.js, etc.)
- Backend API integration for real part data
- Advanced AI capabilities
- File upload functionality
- Export/import features
- Team collaboration features

## Development

To modify or extend the application:

1. Edit `index.html` for structure changes
2. Modify `styles.css` for styling updates
3. Update `script.js` for functionality changes
4. Add new parts by modifying the `sampleParts` array in `script.js`

## License

This is a demonstration application. Feel free to use and modify as needed. 
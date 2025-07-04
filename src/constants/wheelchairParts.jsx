export const wheelchairParts = [
  {
    id: 'headrest',
    name: 'Headrest',
    position: { x: 50, y: 15, z: 0 },
    description: 'Adjustable headrest provides comfortable support for the user\'s head and neck during operation.',
    howItWorks: 'The headrest can be adjusted for height and angle to accommodate different user preferences and medical needs.',
    uses: 'Provides essential head and neck support, especially important during stair climbing operations where body position changes.',
    image: '/assets/images/headrest.jpg',
    icon: '🧑‍🦽'
  },
  {
    id: 'seat',
    name: 'Seat',
    position: { x: 50, y: 35, z: 0 },
    description: 'Fire-resistant cushioned seat with automatic tilt system for optimal positioning during different terrains.',
    howItWorks: 'The seat automatically adjusts its angle during stair climbing to maintain user comfort and safety. It can tilt within a 14-degree range.',
    uses: 'Provides comfortable seating with safety features including fire-resistant materials and automatic positioning for stability.',
    image: '/assets/images/seat.jpg',
    icon: '🪑'
  },
  {
    id: 'remote-controller',
    name: 'Remote Controller',
    position: { x: 65, y: 45, z: 0 },
    description: 'Advanced control system with joystick and LCD display for operating the wheelchair.',
    howItWorks: 'Features customizable sensitivity settings, speed control, mode selection (wheels/tracks), and displays battery status and error codes.',
    uses: 'Complete control of wheelchair functions including movement, speed, mode switching, and system monitoring.',
    image: '/assets/images/controller.jpg',
    icon: '🎮'
  },
  {
    id: 'armrest',
    name: 'Armrest',
    position: { x: 35, y: 40, z: 0 },
    description: 'Adjustable armrests for user comfort and support.',
    howItWorks: 'Height adjustable from 150-300mm to accommodate different user needs and preferences.',
    uses: 'Provides arm support and comfort during operation. Important safety note: Never lift wheelchair by armrests.',
    image: '/assets/images/armrest.jpg',
    icon: '🫳'
  },
  {
    id: 'legrest',
    name: 'Legrest/Footrest',
    position: { x: 50, y: 70, z: 0 },
    description: 'Adjustable leg support with footrest platform.',
    howItWorks: 'Length adjustable from 380-540mm. Can be adjusted mechanically or electrically depending on model.',
    uses: 'Supports user\'s legs and feet. Safety warning: Never stand on footrests or use them for lifting the wheelchair.',
    image: '/assets/images/legrest.jpg',
    icon: '🦵'
  },
  {
    id: 'drive-wheels',
    name: 'Drive Wheels',
    position: { x: 25, y: 55, z: 0 },
    description: 'Large 320-355mm drive wheels for smooth movement on flat surfaces.',
    howItWorks: 'Powered by 24V motors, these wheels provide movement up to 7-8 km/h on flat terrain with 18-25km range.',
    uses: 'Primary propulsion system for movement on flat surfaces, sidewalks, and gentle slopes up to 15 degrees.',
    image: '/assets/images/wheels.jpg',
    icon: '🛞'
  },
  {
    id: 'track-system',
    name: 'Track Platform',
    position: { x: 50, y: 85, z: 0 },
    description: 'Revolutionary track system for climbing stairs and obstacles.',
    howItWorks: 'Activates via control panel to deploy tracks that can climb stairs up to 35° angle and steps up to 180mm high.',
    uses: 'Enables stair climbing, curb navigation, and obstacle overcoming. Can handle 600-900 steps per charge.',
    image: '/assets/images/tracks.jpg',
    icon: '⛓️'
  },
  {
    id: 'battery',
    name: 'Battery Module',
    position: { x: 75, y: 65, z: 0 },
    description: 'High-capacity AGM or Lithium battery system.',
    howItWorks: '33-42 A*h capacity batteries charged with included 220V charger. Features automatic monitoring and safety systems.',
    uses: 'Powers all wheelchair functions. Provides 18-25km range on wheels or 600-900 steps on tracks.',
    image: '/assets/images/battery.jpg',
    icon: '🔋'
  },
  {
    id: 'safety-handle',
    name: 'Safety Handle',
    position: { x: 50, y: 25, z: 0 },
    description: 'Special handles for safe transport and assistance.',
    howItWorks: 'Reinforced handles designed specifically for lifting and maneuvering the wheelchair safely.',
    uses: 'Only safe points for lifting wheelchair. Attendants should use these handles or front frame beam only.',
    image: '/assets/images/handle.jpg',
    icon: '🫴'
  },
  {
    id: 'backrest',
    name: 'Backrest',
    position: { x: 50, y: 20, z: 0 },
    description: 'Ergonomic back support with adjustable recline feature.',
    howItWorks: 'Can be adjusted to multiple angles for optimal comfort and support during different activities.',
    uses: 'Provides back support and can be reclined for resting positions. Includes lumbar support for long-term use.',
    image: '/assets/images/backrest.jpg',
    icon: '🪑'
  },
  {
    id: 'footplate',
    name: 'Footplate',
    position: { x: 50, y: 75, z: 0 },
    description: 'Adjustable foot support platform.',
    howItWorks: 'Can be raised, lowered, and angled to accommodate different leg lengths and positions.',
    uses: 'Supports feet and legs in comfortable position. Swivels out of the way for transfers.',
    image: '/assets/images/footplate.jpg',
    icon: '👣'
  },
  {
    id: 'control-panel',
    name: 'Control Panel',
    position: { x: 60, y: 40, z: 0 },
    description: 'User interface for wheelchair operation.',
    howItWorks: 'Includes joystick for movement control, mode selection buttons, and status indicators.',
    uses: 'Primary interface for operating the wheelchair. Includes emergency stop function.',
    image: '/assets/images/control-panel.jpg',
    icon: '🕹️'
  }
];

export const keySpecs = [
  { title: 'Max Load', value: '115 kg', icon: '⚖️' },
  { title: 'Max Speed', value: '8 km/h', icon: '🚀' },
  { title: 'Stair Angle', value: '35°', icon: '📐' },
  { title: 'Battery Life', value: '12 hours', icon: '⏳' },
  { title: 'Weight Capacity', value: '300 lbs', icon: '🏋️' },
  { title: 'Max Incline', value: '35°', icon: '⛰️' },
  { title: 'Range (Wheel Mode)', value: '18-25 km', icon: '🛣️' },
  { title: 'Steps per Charge', value: '600-900', icon: '🔄' },
  { title: 'Charging Time', value: '6-8 hours', icon: '🔌' },
  { title: 'Weight', value: '95 kg', icon: '🏋️' },
  { title: 'Seat Width', value: '45 cm', icon: '📏' },
  { title: 'Turning Radius', value: '80 cm', icon: '🔄' }
];

export const wheelchairFeatures = [
  {
    title: 'Dual Mode Operation',
    description: 'Switch between wheels for flat surfaces and tracks for stairs and rough terrain',
    icon: '🔄'
  },
  {
    title: 'Safety Mechanisms',
    description: 'Anti-tip system, emergency brakes, and stability control for all conditions',
    icon: '🛡️'
  },
  {
    title: 'Ergonomic Design',
    description: 'Adjustable seating, armrests, and controls for individual comfort',
    icon: '🪑'
  },
  {
    title: 'All-Terrain Capability',
    description: 'Handles various surfaces including grass, gravel, and uneven terrain',
    icon: '🌿'
  },
  {
    title: 'Long Battery Life',
    description: 'Extended operation time with efficient power management',
    icon: '🔋'
  },
  {
    title: 'Easy Maintenance',
    description: 'Modular design with easily accessible components',
    icon: '🛠️'
  }
];
import { categories } from './categories';

export interface Link {
  id: string;
  title: string;
  url: string;
  description: string;
  categoryId: string;
}

export const links: Link[] = [
  // Color Tools
  {
    id: 'picular',
    title: 'Picular',
    url: 'https://picular.co/',
    description: 'Color palette generator tool',
    categoryId: 'color-tools'
  },
  {
    id: 'themecn',
    title: 'ThemeCN',
    url: 'https://themecn.dev/',
    description: 'Colour tool for UI',
    categoryId: 'color-tools'
  },
  {
    id: 'colorize-design',
    title: 'Colorize Design',
    url: 'https://colorize.design/',
    description: 'Generate color palettes for any website',
    categoryId: 'color-tools'
  },
  {
    id: 'gradientos',
    title: 'Gradientos',
    url: 'https://www.gradientos.app/',
    description: 'CSS color palette',
    categoryId: 'color-tools'
  },
  {
    id: 'uicolors',
    title: 'UI Colors',
    url: 'https://uicolors.app/generate/1fa6f2',
    description: 'UI color palette generator',
    categoryId: 'color-tools'
  },
  {
    id: 'shadow-gradients',
    title: 'Shadow Gradients',
    url: 'https://alvarotrigo.com/shadow-gradients/',
    description: 'CSS shadow gradients',
    categoryId: 'color-tools'
  },
  {
    id: 'webgradients',
    title: 'Web Gradients',
    url: 'https://webgradients.com/',
    description: 'CSS gradients massive library',
    categoryId: 'color-tools'
  },
  {
    id: 'palettemaker',
    title: 'Palette Maker',
    url: 'https://palettemaker.com/app',
    description: 'Create color palette for UI',
    categoryId: 'color-tools'
  },
  {
    id: 'mybrandnewlogo',
    title: 'My Brand New Logo',
    url: 'https://mybrandnewlogo.com/color-gradient-generator',
    description: 'CSS color generator',
    categoryId: 'color-tools'
  },

  // CSS Tools & Loaders
  {
    id: 'flexboxlabs',
    title: 'Flexbox Labs',
    url: 'https://flexboxlabs.netlify.app/',
    description: 'Flex box tool',
    categoryId: 'css-tools'
  },
  {
    id: 'cssloaders-github',
    title: 'CSS Loaders',
    url: 'https://cssloaders.github.io/',
    description: 'CSS loaders',
    categoryId: 'css-tools'
  },
  {
    id: 'css-text-circle',
    title: 'CSS Text Circle',
    url: 'https://codepen.io/donotfold/pen/ZYYYJRV',
    description: 'CSS text circle',
    categoryId: 'css-tools'
  },
  {
    id: 'css-mesh-gradients',
    title: 'CSS Mesh Gradients',
    url: 'https://www.csshero.org/mesher',
    description: 'CSS mesh gradients',
    categoryId: 'css-tools'
  },
  {
    id: 'css-grid-generator',
    title: 'CSS Grid Generator',
    url: 'https://cssgridgenerator.io/',
    description: 'CSS grid generator tool',
    categoryId: 'css-tools'
  },
  {
    id: 'animista',
    title: 'Animista',
    url: 'https://animista.net/',
    description: 'CSS Animations',
    categoryId: 'css-tools'
  },
  {
    id: 'fancy-border-radius',
    title: 'Fancy Border Radius',
    url: 'https://9elements.github.io/',
    description: 'Fancy border radius generator',
    categoryId: 'css-tools'
  },
  {
    id: 'css-loaders',
    title: 'CSS Loaders',
    url: 'https://css-loaders.com/',
    description: 'Massive CSS loaders',
    categoryId: 'css-tools'
  },
  {
    id: 'cssloaders-github-io',
    title: 'CSS Loaders GitHub',
    url: 'https://cssloaders.github.io/',
    description: 'CSS Loaders',
    categoryId: 'css-tools'
  },
  {
    id: 'loading-io',
    title: 'Loading.io',
    url: 'https://loading.io/css/',
    description: 'CSS Loaders',
    categoryId: 'css-tools'
  },
  {
    id: 'freefrontend-css-loaders',
    title: 'Free Frontend CSS Loaders',
    url: 'https://freefrontend.com/css-loaders/',
    description: 'CSS Loaders',
    categoryId: 'css-tools'
  },
  {
    id: 'css-loader-generator',
    title: 'CSS Loader Generator',
    url: 'https://10015.io/tools/css-loader-generator',
    description: 'CSS Loaders',
    categoryId: 'css-tools'
  },
  {
    id: 'animated-css-bg-generator',
    title: 'Animated CSS Background Generator',
    url: 'https://wweb.dev/resources/animated-css-background-generator',
    description: 'CSS animated Backgrounds',
    categoryId: 'css-tools'
  },
  {
    id: 'loader-generator',
    title: 'Loader Generator',
    url: 'https://wweb.dev/resources/loader-generator',
    description: 'Customized loaders',
    categoryId: 'css-tools'
  },
  {
    id: 'css-3d-buttons',
    title: 'CSS 3D Buttons',
    url: 'https://csspro.com/css-3d-buttons',
    description: '3D Buttons',
    categoryId: 'css-tools'
  },
  {
    id: 'animate-style',
    title: 'Animate.style',
    url: 'https://animate.style/',
    description: 'CSS Animations',
    categoryId: 'css-tools'
  },
  {
    id: 'cssbuttons',
    title: 'CSS Buttons',
    url: 'https://cssbuttons.app/',
    description: 'Button Animations',
    categoryId: 'css-tools'
  },
  {
    id: 'cssicon',
    title: 'CSS Icon',
    url: 'https://cssicon.space/#/icon/sun-solid',
    description: 'CSS Icons black&white theme',
    categoryId: 'css-tools'
  },
  {
    id: 'animatiss',
    title: 'Animatiss',
    url: 'https://xsgames.co/animatiss/',
    description: 'CSS Animations',
    categoryId: 'css-tools'
  },
  {
    id: 'toggles',
    title: 'Toggles',
    url: 'https://toggles.dev/',
    description: 'Theme toggles',
    categoryId: 'css-tools'
  },

  // UI Components
  {
    id: 'ark-ui',
    title: 'Ark UI',
    url: 'https://ark-ui.com/',
    description: 'React components',
    categoryId: 'ui-components'
  },
  {
    id: 'magui-live',
    title: 'MageUI',
    url: 'https://www.mageui.live/',
    description: 'Animated JS library',
    categoryId: 'ui-components'
  },
  {
    id: 'prismane',
    title: 'Prismane',
    url: 'https://www.prismane.io/',
    description: 'React components',
    categoryId: 'ui-components'
  },
  {
    id: 'spectrum',
    title: 'Spectrum',
    url: 'https://ui.spectrumhq.in/',
    description: 'For high quality components',
    categoryId: 'ui-components'
  },
  {
    id: 'cuicui',
    title: 'CuiCui',
    url: 'https://cuicui.day/application-ui',
    description: 'High quality components',
    categoryId: 'ui-components'
  },
  {
    id: 'uiverse',
    title: 'UIverse',
    url: 'https://uiverse.io/',
    description: 'Open source UI component library',
    categoryId: 'ui-components'
  },
  {
    id: 'aceternity',
    title: 'Aceternity UI',
    url: 'https://ui.aceternity.com/components/sparkles',
    description: 'UI components for React, Tailwind',
    categoryId: 'ui-components'
  },
  {
    id: 'shadcn',
    title: 'Shadcn UI',
    url: 'https://ui.shadcn.com/themes',
    description: 'UI components',
    categoryId: 'ui-components'
  },
  {
    id: 'jqueryui',
    title: 'jQuery UI',
    url: 'https://jqueryui.com/',
    description: 'jQuery UI interface',
    categoryId: 'ui-components'
  },
  {
    id: 'material-ui',
    title: 'Material UI',
    url: 'https://mui.com/',
    description: 'Material UI component for React',
    categoryId: 'ui-components'
  },
  {
    id: 'revealjs',
    title: 'Reveal.js',
    url: 'https://revealjs.com/',
    description: 'HTML components',
    categoryId: 'ui-components'
  },
  {
    id: 'uiball-loaders',
    title: 'UI Ball Loaders',
    url: 'https://uiball.com/ldrs/',
    description: 'Loaders',
    categoryId: 'ui-components'
  },
  {
    id: 'flyonui',
    title: 'FlyonUI',
    url: 'https://flyonui.com/',
    description: 'Tailwind CSS library',
    categoryId: 'ui-components'
  },
  {
    id: 'react-components',
    title: 'React Components',
    url: 'https://reactcomponents.com/',
    description: 'Free React components',
    categoryId: 'ui-components'
  },
  {
    id: 'park-ui',
    title: 'Park UI',
    url: 'https://park-ui.com/',
    description: 'React, Vue, Solid UI components library',
    categoryId: 'ui-components'
  },
  {
    id: 'magic-ui',
    title: 'Magic UI',
    url: 'https://magicui.design/',
    description: 'UI components library for React, TypeScript, Tailwind CSS, and Motion',
    categoryId: 'ui-components'
  },
  {
    id: 'vaul',
    title: 'Vaul',
    url: 'https://vaul.emilkowal.ski/getting-started',
    description: 'React Drawer components',
    categoryId: 'ui-components'
  },
  {
    id: 'reactbits',
    title: 'React Bits',
    url: 'https://www.reactbits.dev/',
    description: 'Animated UI component',
    categoryId: 'ui-components'
  },
  {
    id: 'hyperui',
    title: 'Hyper UI',
    url: 'https://www.hyperui.dev/',
    description: 'UI components',
    categoryId: 'ui-components'
  },
  {
    id: 'intentui',
    title: 'Intent UI',
    url: 'https://intentui.com/docs/2.x/getting-started/installation',
    description: 'React UI library components',
    categoryId: 'ui-components'
  },
  {
    id: 'heroui',
    title: 'Hero UI',
    url: 'https://www.heroui.com/',
    description: 'React/Next.js Framework',
    categoryId: 'ui-components'
  },
  {
    id: 'framer',
    title: 'Framer',
    url: 'https://www.framer.com/',
    description: 'Portfolio Designs',
    categoryId: 'ui-components'
  },
  {
    id: 'inika-desktop',
    title: 'Inika Desktop',
    url: 'https://inikasdesktop.framer.website/',
    description: 'Inspired by Mac UI using Framer',
    categoryId: 'ui-components'
  },

  // JS Libraries
  {
    id: 'lynxjs',
    title: 'LynxJS',
    url: 'https://lynxjs.org/',
    description: 'React mobile framework',
    categoryId: 'js-libraries'
  },
  {
    id: 'animated-icons',
    title: 'Animated Icons',
    url: 'https://gradienty.codes/animated-icons',
    description: 'Animated icon library',
    categoryId: 'js-libraries'
  },
  {
    id: 'frimousse',
    title: 'Frimousse',
    url: 'https://frimousse.liveblocks.io/',
    description: 'Emojis in React',
    categoryId: 'js-libraries'
  },
  {
    id: 'echarts',
    title: 'ECharts',
    url: 'https://echarts.apache.org/',
    description: 'Open source charts',
    categoryId: 'js-libraries'
  },
  {
    id: 'react-google-maps',
    title: 'React Google Maps',
    url: 'https://visgl.github.io/react-google-maps/examples',
    description: 'React Google Maps',
    categoryId: 'js-libraries'
  },
  {
    id: 'react-haiku',
    title: 'React Haiku',
    url: 'https://www.reacthaiku.dev/',
    description: 'React readymade hooks',
    categoryId: 'js-libraries'
  },
  {
    id: 'smooth-ui',
    title: 'Smooth UI',
    url: 'https://www.smoothui.dev/',
    description: 'React animated components',
    categoryId: 'js-libraries'
  },
  {
    id: 'atroposjs',
    title: 'Atropos JS',
    url: 'https://atroposjs.com/',
    description: '3D hover JS animated library',
    categoryId: 'js-libraries'
  },
  {
    id: 'pragmatic-drag-and-drop',
    title: 'Pragmatic Drag and Drop',
    url: 'https://atlassian.design/components/pragmatic-drag-and-drop/',
    description: 'Drag n drop',
    categoryId: 'js-libraries'
  },
  {
    id: 'react-beautiful-dnd',
    title: 'React Beautiful DnD',
    url: 'https://github.com/atlassian/react-beautiful-dnd',
    description: 'Drag n drop for React',
    categoryId: 'js-libraries'
  },
  {
    id: 'animejs',
    title: 'Anime.js',
    url: 'https://animejs.com/',
    description: 'JS animated library',
    categoryId: 'js-libraries'
  },
  {
    id: 'pressurejs',
    title: 'Pressure.js',
    url: 'https://pressurejs.com/',
    description: 'Handle Long press events',
    categoryId: 'js-libraries'
  },
  {
    id: 'driverjs',
    title: 'Driver.js',
    url: 'https://driverjs.com/',
    description: 'JS page tour',
    categoryId: 'js-libraries'
  },
  {
    id: 'roughnotation',
    title: 'Rough Notation',
    url: 'https://roughnotation.com/',
    description: 'Which allows you to create animated sketch highlight',
    categoryId: 'js-libraries'
  },
  {
    id: 'shepherdjs',
    title: 'Shepherd.js',
    url: 'https://www.shepherdjs.dev/',
    description: 'Page tours',
    categoryId: 'js-libraries'
  },
  {
    id: 'tempo',
    title: 'Tempo',
    url: 'https://tempo.formkit.com/',
    description: 'For Dates',
    categoryId: 'js-libraries'
  },
  {
    id: 'gsap',
    title: 'GSAP',
    url: 'https://gsap.com/',
    description: 'JS Animated',
    categoryId: 'js-libraries'
  },
  {
    id: 'maxwellito',
    title: 'Maxwellito',
    url: 'https://github.com/maxwellito',
    description: 'JS Animated',
    categoryId: 'js-libraries'
  },

  {
    id: 'uv-canvas',
    title: 'UV Canvas',
    url: 'https://uvcanvas.com/docs',
    description: 'Animated BG library for React',
    categoryId: 'js-libraries'
  },
  {
    id: 'cursify',
    title: 'Cursify',
    url: 'https://cursify.vercel.app/',
    description: 'JS interactive cursor effects in React',
    categoryId: 'js-libraries'
  },
  {
    id: 'react-sounds',
    title: 'React Sounds',
    url: 'https://www.reactsounds.com/',
    description: 'Add sounds for buttons in react',
    categoryId: 'js-libraries'
  },
  {
    id: 'vanta',
    title: 'Vanta.js',
    url: 'https://www.vantajs.com/',
    description: 'Animated 3D backgrounds',
    categoryId: 'js-libraries'
  },
  {
    id: 'playcanvas-react',
    title: 'PlayCanvas React',
    url: 'https://playcanvas-react.vercel.app/docs',
    description: '3D app library React',
    categoryId: 'js-libraries'
  },
  {
    id: 'swapy',
    title: 'Swapy',
    url: 'https://swapy.tahazsh.com/',
    description: 'JS library draggable boxes',
    categoryId: 'js-libraries'
  },
  {
    id: 'jj811208-repos',
    title: 'JJ811208 Repos',
    url: 'https://github.com/jj811208?tab=repositories',
    description: 'Animated Login etc',
    categoryId: 'js-libraries'
  },
  {
    id: 'rosencharts',
    title: 'RosenCharts',
    url: 'https://rosencharts.com/',
    description: 'React Charts',
    categoryId: 'js-libraries'
  },
  {
    id: 'threejs',
    title: 'Three.js',
    url: 'https://threejs.org/',
    description: 'JavaScript 3D library',
    categoryId: 'js-libraries'
  },
  {
    id: 'babylonjs',
    title: 'Babylon.js',
    url: 'https://www.babylonjs.com/',
    description: '3D rendering engine',
    categoryId: 'js-libraries'
  },
  {
    id: 'pixijs',
    title: 'Pixi.js',
    url: 'https://pixijs.com/',
    description: '2D WebGL renderer',
    categoryId: 'js-libraries'
  },
  {
    id: 'matterjs',
    title: 'Matter.js',
    url: 'https://brm.io/matter-js/',
    description: '2D physics engine',
    categoryId: 'js-libraries'
  },

  // Sliders & Carousels
  {
    id: 'smooothy',
    title: 'Smooothy',
    url: 'https://smooothy.vercel.app/',
    description: 'JS slider component',
    categoryId: 'sliders'
  },
  {
    id: 'simple-parallax',
    title: 'Simple Parallax',
    url: 'https://simpleparallax.com/',
    description: 'Simple parallax animations',
    categoryId: 'sliders'
  },
  {
    id: 'gliderjs',
    title: 'Glider.js',
    url: 'https://nickpiscitelli.github.io/Glider.js/',
    description: 'For slider carousel',
    categoryId: 'sliders'
  },
  {
    id: 'swiperjs',
    title: 'Swiper.js',
    url: 'https://swiperjs.com/',
    description: 'For slider carousel',
    categoryId: 'sliders'
  },
  {
    id: 'swiffy-slider',
    title: 'Swiffy Slider',
    url: 'https://swiffyslider.com/',
    description: 'Slider carousel',
    categoryId: 'sliders'
  },
  {
    id: 'keen-slider',
    title: 'Keen Slider',
    url: 'https://keen-slider.io/',
    description: 'Slider carousel',
    categoryId: 'sliders'
  },
  {
    id: 'splide',
    title: 'Splide',
    url: 'https://splidejs.com/',
    description: 'For slider carousel',
    categoryId: 'sliders'
  },
  {
    id: 'slider-effects',
    title: 'Slider Effects',
    url: 'https://philparsons.co.uk/slider/docs/effects/carousel',
    description: 'Slider effect carousel',
    categoryId: 'sliders'
  },
  {
    id: 'bespoke',
    title: 'Bespoke',
    url: 'https://github.com/bespokejs/bespoke',
    description: 'JS carousel library',
    categoryId: 'sliders'
  },

  // Development Tools
  {
    id: 'liambx',
    title: 'LiamBX',
    url: 'https://liambx.com/',
    description: 'Visualize SQL Database',
    categoryId: 'dev-tools'
  },
  {
    id: 'freepublicapis',
    title: 'Free Public APIs',
    url: 'https://www.freepublicapis.com/',
    description: 'Free public APIs',
    categoryId: 'dev-tools'
  },
  {
    id: 'roadmap',
    title: 'Roadmap.sh',
    url: 'https://roadmap.sh/',
    description: 'Roadmap for Developers',
    categoryId: 'dev-tools'
  },
  {
    id: 'font-tester',
    title: 'Font Tester',
    url: 'https://font-tester.foxcraft.tech/',
    description: 'Font tester chrome extension',
    categoryId: 'dev-tools'
  },
  {
    id: 'github-city',
    title: 'GitHub City',
    url: 'https://honzaap.github.io/GithubCity',
    description: 'Tool to showcase your github contributions in 3D city',
    categoryId: 'dev-tools'
  },
  {
    id: 'devpedia',
    title: 'DevPedia',
    url: 'https://devpedia.dev/',
    description: 'Explanation about tools for developers',
    categoryId: 'dev-tools'
  },
  {
    id: 'file-pizza',
    title: 'File Pizza',
    url: 'https://file.pizza/',
    description: 'Transfer files securely. It is an open source',
    categoryId: 'dev-tools'
  },
  {
    id: 'firebase-studio',
    title: 'Firebase Studio',
    url: 'https://firebase.studio/',
    description: 'Alternative to cursor',
    categoryId: 'dev-tools'
  },
  {
    id: 'githubtree',
    title: 'GitHub Tree',
    url: 'https://githubtree.mgks.dev/',
    description: 'Git hub tree for visualization',
    categoryId: 'dev-tools'
  },
  {
    id: 'ikonate',
    title: 'Ikonate',
    url: 'https://ikonate.com/',
    description: 'Icons',
    categoryId: 'dev-tools'
  },
  {
    id: 'gitzip',
    title: 'GitZip',
    url: 'https://chromewebstore.google.com/detail/gitzip-for-github',
    description: 'Download GitHub files',
    categoryId: 'dev-tools'
  },
  {
    id: 'device-simulator',
    title: 'Device Simulator',
    url: 'https://chromewebstore.google.com/detail/device-simulator-tester/iacpblbgooifgclhbdcaonebhoadpmgj?hl=en',
    description: 'For UI testing',
    categoryId: 'dev-tools'
  },
  {
    id: 'htmlrev',
    title: 'HTML Rev',
    url: 'https://htmlrev.com/',
    description: 'Free 1500+ HTML templates',
    categoryId: 'dev-tools'
  },
  {
    id: 'uigenerator',
    title: 'UI Generator',
    url: 'https://uigenerator.org/',
    description: 'UI generator',
    categoryId: 'dev-tools'
  },
  {
    id: 'os-js',
    title: 'OS.js',
    url: 'https://www.os-js.org/',
    description: 'Desktop Experience',
    categoryId: 'dev-tools'
  },
  {
    id: 'web-dev',
    title: 'Web.dev',
    url: 'https://web.dev/',
    description: 'By Google for web development',
    categoryId: 'dev-tools'
  },
  {
    id: 'hoppscotch',
    title: 'Hoppscotch',
    url: 'https://hoppscotch.io/',
    description: 'Alternative to POSTMAN',
    categoryId: 'dev-tools'
  },
  {
    id: 'project-wallace',
    title: 'Project Wallace',
    url: 'https://www.projectwallace.com/',
    description: 'Optimize CSS',
    categoryId: 'dev-tools'
  },
  {
    id: 'quickref',
    title: 'QuickRef',
    url: 'https://quickref.me/',
    description: 'Cheatsheet reference for any language',
    categoryId: 'dev-tools'
  },
  {
    id: 'jsv9000',
    title: 'JSV9000',
    url: 'https://www.jsv9000.app/',
    description: 'Learn & Master Javascript visually',
    categoryId: 'dev-tools'
  },
  {
    id: 'repofiles',
    title: 'RepoFiles',
    url: 'https://repofiles.com/',
    description: 'Visualize for GitHub repos',
    categoryId: 'dev-tools'
  },
  {
    id: 'puter',
    title: 'Puter',
    url: 'https://puter.com/',
    description: 'OS that runs in browser',
    categoryId: 'dev-tools'
  },
  {
    id: 'kaneo',
    title: 'Kaneo',
    url: 'https://kaneo.app/',
    description: 'Open source alternative to Trello',
    categoryId: 'dev-tools'
  },
  {
    id: 'lucide',
    title: 'Lucide',
    url: 'https://lucide.dev/icons/',
    description: 'Icons',
    categoryId: 'dev-tools'
  },
  {
    id: 'quizzes',
    title: 'Quizzes',
    url: 'https://quizzes.madza.dev/',
    description: 'Quiz for any type of interview Basics',
    categoryId: 'dev-tools'
  },
  {
    id: 'bundlephobia',
    title: 'Bundlephobia',
    url: 'https://bundlephobia.com/',
    description: 'Analyze size and impact of NPM',
    categoryId: 'dev-tools'
  },
  {
    id: 'toptal-gitignore',
    title: 'Toptal Gitignore',
    url: 'https://www.toptal.com/developers/gitignore',
    description: 'It will give you a basic gitignore file',
    categoryId: 'dev-tools'
  },
  {
    id: 'tesseract',
    title: 'Tesseract',
    url: 'https://tesseract.projectnaptha.com/',
    description: 'Extract text from images',
    categoryId: 'dev-tools'
  },
  {
    id: 'netlify-drop',
    title: 'Netlify Drop',
    url: 'https://app.netlify.com/drop',
    description: 'Publish ur website in < 10 sec',
    categoryId: 'dev-tools'
  },

  // Visual Tools
  {
    id: 'summer-afternoon',
    title: 'Summer Afternoon',
    url: 'https://summer-afternoon.vlucendo.com/',
    description: 'Three.js animated for childhood',
    categoryId: 'visual-tools'
  },
  {
    id: 'animated-icons',
    title: 'Animated Icons',
    url: 'https://icons.pqoqubbw.dev/',
    description: 'Animated icons',
    categoryId: 'visual-tools'
  },
  {
    id: 'fluid-motion',
    title: 'Fluid Motion',
    url: 'https://fluidmotion.app/halo',
    description: 'Background generator',
    categoryId: 'visual-tools'
  },
  {
    id: 'blobmaker',
    title: 'Blob Maker',
    url: 'https://www.blobmaker.app/',
    description: 'Create customized SVG',
    categoryId: 'visual-tools'
  },
  {
    id: 'svg-shape-generator',
    title: 'SVG Shape Generator',
    url: 'https://www.softr.io/tools/svg-shape-generator',
    description: 'Generate free SVG',
    categoryId: 'visual-tools'
  },
  {
    id: 'shots-so',
    title: 'Shots.so',
    url: 'https://shots.so/',
    description: 'Edit images with animations',
    categoryId: 'visual-tools'
  },
  {
    id: 'wooz-store',
    title: 'Wooz.store',
    url: 'https://wooz.store/',
    description: 'Animated 3D website using JS',
    categoryId: 'visual-tools'
  },
  {
    id: 'postspark',
    title: 'PostSpark',
    url: 'https://postspark.app/',
    description: 'Create stunning images in a professional way',
    categoryId: 'visual-tools'
  },
  {
    id: 'undraw',
    title: 'unDraw',
    url: 'https://undraw.co/illustrations/5',
    description: 'Customizable colors for SVG, Png',
    categoryId: 'visual-tools'
  },
  {
    id: 'vscode-theme-generator',
    title: 'VS Code Theme Generator',
    url: 'https://github.com/RodrigoLuglio/vscode-theme-generator',
    description: 'VS Code theme generator',
    categoryId: 'visual-tools'
  },
  {
    id: 'screely',
    title: 'Screely',
    url: 'https://screely.com/editor',
    description: 'Customize images/screenshots with high quality',
    categoryId: 'visual-tools'
  },
  {
    id: 'layout-bradwoods',
    title: 'Layout',
    url: 'https://layout.bradwoods.io/',
    description: 'CSS Grid generator',
    categoryId: 'visual-tools'
  },
  {
    id: 'easing-wizard',
    title: 'Easing Wizard',
    url: 'https://easingwizard.com/',
    description: 'Animated CSS',
    categoryId: 'visual-tools'
  },

  // Learning Resources
  {
    id: 'deepwiki',
    title: 'DeepWiki',
    url: 'https://deepwiki.com/android/architecture-templates',
    description: 'For any github.com repo replace github with deepwiki',
    categoryId: 'learning'
  },
  {
    id: 'joshwcomeau-css-grid',
    title: 'Josh W Comeau CSS Grid',
    url: 'https://www.joshwcomeau.com/css/interactive-guide-to-grid/',
    description: 'Interactive guide for CSS',
    categoryId: 'learning'
  },
  {
    id: 'idea-instructions',
    title: 'Idea Instructions',
    url: 'https://idea-instructions.com/',
    description: 'It teaches you fun comics for algorithms',
    categoryId: 'learning'
  },
  {
    id: 'game-dev-websites',
    title: 'Game Dev Websites',
    url: 'https://phaser.io/',
    description: 'Video Gaming Website',
    categoryId: 'learning'
  },
  {
    id: 'portfolio-websites',
    title: 'Portfolio Websites',
    url: 'https://www.prettyfolio.com/',
    description: 'Portfolio websites',
    categoryId: 'learning'
  },
  {
    id: 'css-games',
    title: 'CSS Games',
    url: 'https://flexboxfroggy.com/',
    description: 'Learn CSS through games',
    categoryId: 'learning'
  },
  {
    id: 'frontend-mentor',
    title: 'Frontend Mentor',
    url: 'https://www.frontendmentor.io/',
    description: 'Code challenges for Frontend Developer',
    categoryId: 'learning'
  },
  {
    id: 'project-based-learning',
    title: 'Project Based Learning',
    url: 'https://github.com/practical-tutorials/project-based-learning',
    description: 'Practice all type of programming languages',
    categoryId: 'learning'
  },
  {
    id: 'lookup-design',
    title: 'Lookup Design',
    url: 'https://lookup.design/',
    description: 'UI examples for Developers',
    categoryId: 'learning'
  },
  {
    id: 'florin-pop-projects',
    title: 'Florin Pop Projects',
    url: 'https://www.florin-pop.com/blog/100-days-100-projects/',
    description: 'JS projects 100 days',
    categoryId: 'learning'
  },
  {
    id: 'ui-design-daily',
    title: 'UI Design Daily',
    url: 'https://www.uidesigndaily.com/',
    description: 'To practice CSS',
    categoryId: 'learning'
  },
  {
    id: 'call-to-inspiration',
    title: 'Call to Inspiration',
    url: 'https://calltoinspiration.com/',
    description: 'Design ideas for Developers',
    categoryId: 'learning'
  },
  {
    id: 'andreasbm-github',
    title: 'Andreas BM GitHub',
    url: 'https://andreasbm.github.io/',
    description: 'Learn almost everything in web development docs',
    categoryId: 'learning'
  },
  {
    "id": "deepwiki-android-architecture-templates",
    "title": "DeepWiki Android Architecture Templates",
    "url": "https://deepwiki.com/android/architecture-templates",
    "description": "Replace github.com with deepwiki.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "gitsummarize-android-architecture-templates",
    "title": "GitSummarize Android Architecture Templates",
    "url": "https://gitsummarize.com/android/architecture-templates",
    "description": "Replace github.com with gitsummarize.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "chat-forgithub-android-architecture-templates",
    "title": "Chat for GitHub - Android Architecture Templates",
    "url": "https://chat.forgithub.com/android/architecture-templates",
    "description": "Replace github.com with chat.forgithub.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "deepwiki-ingest-android-architecture-templates",
    "title": "DeepWiki LLM Ingest - Android Architecture Templates",
    "url": "https://deepwiki.ingest.com/android/architecture-templates",
    "description": "Replace github.com with deepwiki.ingest.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "deepwiki-diagram-android-architecture-templates",
    "title": "DeepWiki Diagram - Android Architecture Templates",
    "url": "https://deepwiki.diagram.com/android/architecture-templates",
    "description": "Replace github.com with deepwiki.diagram.com for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    "id": "deepwiki-dev-android-architecture-templates",
    "title": "DeepWiki VS Code Dev - Android Architecture Templates",
    "url": "https://deepwiki.dev/android/architecture-templates",
    "description": "Replace github.com with deepwiki.dev for any repo to get summarized insights.",
    "categoryId": "git-tools"
  },
  {
    id: 'json-crack',
    title: 'JSON Crack',
    url: 'https://marketplace.visualstudio.com/items?itemName=AykutSarac.jsoncrack-vscode',
    description: 'Seamlessly visualize your JSON data instantly into graphs.',
    categoryId: 'vs-code extensions'
  },
  {
    id: 'auto-close-tag',
    title: 'Auto Close Tag',
    url: 'https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag',
    description: 'Automatically add HTML/XML close tag, same as Visual Studio IDE or Sublime Text',
    categoryId: 'vs-code extensions'
  },
  {
    id:'auto-complete-tag',
    title: 'Auto Complete Tag',
    url: 'https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag',
    description: 'Auto complete HTML/XML tag',
    categoryId: 'vs-code extensions'
  },
  {
    id: 'auto-rename-tag',
    title: 'Auto Rename Tag',
    url: 'https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag',
    description: 'Auto rename paired HTML/XML tag',
    categoryId: 'vs-code extensions'
  },
  {
    id:'colorize',
    title: 'Colorize',
    url: 'https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize',
    description: 'Colorize CSS colors in your editor',
    categoryId: 'vs-code extensions'
  },
  {
    id:'file-tree-extractor',
    title: 'File Tree Extractor',
    url: 'https://marketplace.visualstudio.com/items?itemName=Fuzionix.file-tree-extractor',
    description: 'Extracts the file tree of your project and saves it as a JSON file',
    categoryId: 'vs-code extensions'
  } ,
  {
    id:'highlight-matching-tag',
    title: 'Highlight Matching Tag',
    url: 'https://marketplace.visualstudio.com/items?itemName=vincaslt.highlight-matching-tag',
    description: 'Highlight matching HTML/XML tag',
    categoryId: 'vs-code extensions'
  },
  {
    id:'inline-fold-css',
    title: 'Inline Fold CSS',
    url: 'https://marketplace.visualstudio.com/items?itemName=ctf0.inline-fold-new',
    description: 'Inline fold CSS',
    categoryId: 'vs-code extensions'
  },
  {
    id: 'blackbox-ai',
    title: 'Blackbox AI',
    url: 'https://blackbox.ai/',
    description: 'AI-powered coding assistant for developers',
    categoryId: 'ai-tools'
  },
  {
    id: 'lovable-ai',
    title: 'Lovable AI',
    url: 'https://lovable.ai/',
    description: 'AI tools designed to enhance creativity and productivity',
    categoryId: 'ai-tools'
  },
  {
    id: 'gemini-ai',
    title: 'Gemini AI',
    url: 'https://gemini.com/', // Confirm URL, placeholder used
    description: 'Next-generation AI assistant by Google DeepMind',
    categoryId: 'ai-tools'
  },
  {
    id: 'claude-ai',
    title: 'Claude AI',
    url: 'https://claude.ai/',
    description: 'Conversational AI assistant by Anthropic',
    categoryId: 'ai-tools'
  },
  {
    id: 'code-ai',
    title: 'Code AI',
    url: 'https://code.ai/', // Confirm URL, placeholder used
    description: 'AI-powered code generation and completion tool',
    categoryId: 'ai-tools'
  },
  {
    id: 'notion-ai',
    title: 'Notion AI',
    url: 'https://www.notion.so/product/ai',
    description: 'AI-powered workspace for note-taking and collaboration',
    categoryId: 'ai-tools'
  },
  {
    id: 'miro-ai',
    title: 'Miro AI',
    url: 'https://miro.com/ai/',
    description: 'Collaborative online whiteboard with AI enhancements',
    categoryId: 'ai-tools'
  },
  {
    id: 'bolt-new',
    title: 'Bolt.new',
    url: 'https://bolt.new/',
    description: 'Quick and easy app creation powered by AI',
    categoryId: 'ai-tools'
  },
  {
    id: 'same-new',
    title: 'Same.new',
    url: 'https://same.new/',
    description: 'Instant creation of collaborative workspaces',
    categoryId: 'ai-tools'
  },
  {
    id: 'replit',
    title: 'Replit',
    url: 'https://replit.com/',
    description: 'Collaborative online coding environment with AI features',
    categoryId: 'ai-tools'
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    url: 'https://chat.openai.com/',
    description: 'AI conversational assistant by OpenAI for versatile tasks',
    categoryId: 'ai-tools'
  }

];
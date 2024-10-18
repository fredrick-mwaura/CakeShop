/* Add these styles in your CSS or Tailwind config */
.sidebar {
    transition: width 0.3s ease;
  }
  
  @media (max-width: 768px) {
    .sidebar {
      position: fixed;
      z-index: 50;
      width: 100%;
      height: 100vh;
      left: -100%;
      transition: left 0.3s ease;
    }
  
    .sidebar.w-64 {
      left: 0;
    }
  }
  
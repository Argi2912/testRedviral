export const admin_options = [
  {
    title: "Gestion administrativa",
    group_permissions: [
      "Users",
      "Categories",
      "Accounts",
      "Networks",
      "Services",
      "Roles",
      "Faqs",
    ],
    items: [
      {
        title: "Gestión de usuario",
        route_name: "admin-users",
        group_permissions: "Users",
      },
      {
        title: "Gestion de categorías",
        route_name: "admin-categories",
        group_permissions: "Categories",
      },
      // {
      //   title: "Gestión de cuentas",
      //   route_name: "admin-accounts",
      //   group_permissions: "Accounts",
      // },
      {
        title: "Gestión de RRSS",
        route_name: "admin-social-networks",
        group_permissions: "Networks",
      },
      {
        title: "Servicios",
        route_name: "admin-services",
        group_permissions: "Services",
      },
      {
        title: "Roles",
        route_name: "admin-roles",
        group_permissions: "Roles",
      },
      {
        title: "Gestión de FAQS",
        route_name: "admin-faqs",
        group_permissions: "Faqs",
      },
      {
        title: "Configuración",
        route_name: "admin-settings",
        group_permissions: [],
      },
    ],
  },
  {
    title: "Finanzas",
    group_permissions: ["Requests", "Transactions", "Commissions"],
    items: [
      {
        title: "Historial de pagos",
        route_name: "admin-services-request",
        group_permissions: "Requests",
      },
      {
        title: "Transacciones",
        route_name: "admin-recharges",
        group_permissions: "Transactions",
      },
      // {
      //   title: "Gestión de comisiones",
      //   route_name: "admin-comissions",
      //   group_permissions: "Commissions",
      // },
    ],
  },
  // todo
  {
    title: "Actividades",
    group_permissions: ["Tasks", "Requests"],
    items: [
      // {
      //   title: "Gestión de tareas",
      //   route_name: "admin-tasks",
      //   group_permissions: "Tasks",
      // },
      {
        title: "Solicitud de servicios",
        route_name: "admin-services-request",
        group_permissions: "Requests",
      },
    ],
  },
];
export const client_options = [
  {
    title: "Gestion administrativa",
    group_permissions: [
      "Users",
      "Categories",
      "Accounts",
      "Networks",
      "Services",
      "Roles",
      "Faqs",
    ],
    items: [
      {
        title: "Gestión de cuentas",
        route_name: "admin-accounts",
        group_permissions: "Accounts",
      },
      {
        title: "Servicios",
        route_name: "admin-services",
        group_permissions: "Services",
      },
    ],
  },
  {
    title: "Finanzas",
    group_permissions: ["Requests", "Transactions", "Commissions"],
    items: [
      {
        title: "Historial de pagos",
        route_name: "admin-services-request",
        group_permissions: "Requests",
      },
      {
        title: "Transacciones",
        route_name: "admin-recharges",
        group_permissions: "Transactions",
      },
    ],
  },
  {
    title: "Actividades",
    group_permissions: ["Tasks", "Requests"],
    items: [
      // todo
      // {
      //   title: "Gestión de tareas",
      //   route_name: "admin-tasks",
      //   group_permissions: "Tasks",
      // },
      {
        title: "Solicitud de servicios",
        route_name: "admin-services-request",
        group_permissions: "Requests",
      },
    ],
  },
];
export const worker_options = [
  {
    title: "Gestion administrativa",
    group_permissions: [
      "Users",
      "Categories",
      "Accounts",
      "Networks",
      "Services",
      "Roles",
      "Faqs",
    ],
  },
  {
    title: "Finanzas",
    group_permissions: ["Requests", "Transactions", "Commissions"],
    items: [
      {
        title: "Historial de pagos",
        route_name: "admin-services-request",
        group_permissions: "Requests",
      },
      {
        title: "Transacciones",
        route_name: "admin-recharges",
        group_permissions: "Transactions",
      },
      // {
      //   title: "Gestión de comisiones",
      //   route_name: "admin-comissions",
      //   group_permissions: "Commissions",
      // },
    ],
  },
  // todo
  // {
  //   title: "Actividades",
  //   group_permissions: ["Tasks", "Requests"],
  //   items: [
  //     {
  //       title: "Gestión de tareas",
  //       route_name: "admin-tasks",
  //       group_permissions: "Tasks",
  //     },
  //   ],
  // },
];

export const HelpOptions = [
  {
    title: "Preguntas frecuentes",
    route_name: "clients-faqs",
  },
  {
    title: "Tickets de soporte",
    route_name: "support-ticket",
  },
];

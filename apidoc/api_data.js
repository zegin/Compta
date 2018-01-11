define({ "api": [
  {
    "type": "get",
    "url": "/api/authenticate",
    "title": "Authentication",
    "name": "Authenticate",
    "group": "Api",
    "description": "<p>Authenticate user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error user": [
          {
            "group": "Error user",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error user",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Authentification échouée. Utilisateur introuvable.</p>"
          },
          {
            "group": "Error user",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>user</p>"
          }
        ],
        "Error password": [
          {
            "group": "Error password",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error password",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Authentification échouée. Mauvais mot de passe.</p>"
          },
          {
            "group": "Error password",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>password</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>No token provided.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Enjoy your token!</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Api"
  },
  {
    "type": "post",
    "url": "/api/createHearth",
    "title": "Create Hearth",
    "name": "Create_Hearth",
    "group": "Api",
    "description": "<p>Create a hearth and bind it to the user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "heart",
            "description": "<p>Heart name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Information manquantante.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>No token provided.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>updated jwt token</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Foyer créé</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Api"
  },
  {
    "type": "post",
    "url": "/api/createResource",
    "title": "Create Resource",
    "name": "Create_Resource",
    "group": "Api",
    "description": "<p>Create a hearth's resource</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "resource",
            "description": "<p>resource object</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Erreur.</p>"
          }
        ],
        "ErrorExist": [
          {
            "group": "ErrorExist",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "ErrorExist",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Ressource déjà créée</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>No token provided.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>updated jwt token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Api"
  },
  {
    "type": "post",
    "url": "/api/linkHearth",
    "title": "Link Hearth",
    "name": "Link_Hearth",
    "group": "Api",
    "description": "<p>Link user to a existant hearth</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "heart",
            "description": "<p>Heart name</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Information manquantante.</p>"
          }
        ],
        "ErrorFind": [
          {
            "group": "ErrorFind",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "ErrorFind",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Foyer introuvable.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>No token provided.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>updated jwt token</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Utilisateur attaché</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Api"
  },
  {
    "type": "get",
    "url": "/api/protected",
    "title": "Protected",
    "name": "Protected",
    "group": "Api",
    "description": "<p>Test if jwt token is valid</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Failed to authenticate token.</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>No token provided.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Protected passed</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Api"
  },
  {
    "type": "post",
    "url": "/api/register",
    "title": "Register",
    "name": "Register",
    "group": "Api",
    "description": "<p>Save user into database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>User first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>User last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error": [
          {
            "group": "Error",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>L'utilisateur existe déjà</p>"
          },
          {
            "group": "Error",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>user</p>"
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>No token provided.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Enjoy your token!</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Api"
  },
  {
    "type": "post",
    "url": "/api/auth/saveExpense",
    "title": "SaveExpense",
    "name": "SaveExpense",
    "group": "Api",
    "description": "<p>Save user expense into database</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "product",
            "description": "<p>Expense product name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "price",
            "description": "<p>Expense product price</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>Expense product date</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "repetion",
            "description": "<p>Expense product repetion</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>User expense</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>updated jwt token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Api",
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>No token provided.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/api/auth/getUserExpense",
    "title": "getUserExpenses",
    "name": "SaveExpense",
    "group": "Api",
    "description": "<p>Get all user expenses</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true</p>"
          },
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>updated jwt token</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Api",
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "Boolean",
            "optional": false,
            "field": "success",
            "description": "<p>false</p>"
          },
          {
            "group": "Error 403",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>No token provided.</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/",
    "title": "Basic route",
    "name": "Global",
    "group": "Global",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Hello",
            "description": "<p>! The API is at http://localhost: + port + /api.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/server.js",
    "groupTitle": "Global"
  }
] });

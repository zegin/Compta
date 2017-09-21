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
    "url": "/api/configure",
    "title": "Configure",
    "name": "Configure",
    "group": "Api",
    "description": "<p>Save user configuration into database</p>",
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
            "description": "<p>User heart name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "wage",
            "description": "<p>User wage</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "budget",
            "description": "<p>User budget</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "saving",
            "description": "<p>User saving</p>"
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
    "url": "/api/users",
    "title": "Users",
    "name": "Users",
    "group": "Api",
    "description": "<p>return all users</p>",
    "success": {
      "fields": {
        "Success": [
          {
            "group": "Success",
            "type": "String",
            "optional": false,
            "field": "json",
            "description": "<p>list</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response example:",
          "content": "HTTP/1.1 200 OK\n  [\n    {\n     \"_id\" : \"333abb54efa86c\",\n     \"firstName\": \"John\",\n     \"lastName\": \"Doe\",\n     \"name\" : \"Jdoe\",\n     \"password\" : \"azerty\"\n    }\n  ]",
          "type": "json"
        }
      ]
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

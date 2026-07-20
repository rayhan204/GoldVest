export const userSchema = {
  type: "object",
  properties: {
    id: {
      type: "string",
      example: "uuid",
    },

    fullName: {
      type: "string",
      example: "Rayhan Ghozali",
    },

    email: {
      type: "string",
      example: "rayhan@gmail.com",
    },

    role: {
      type: "string",
      example: "USER",
    },
  },
};

export const walletSchema = {
  type: "object",
  properties: {
    balance:{
      type:"number",
      example:1000000
    }
  }
};

export const portofolioSchema = {
  type: "object",
  properties: {
    totalGram:{
      type:"number",
      example:10.25
    },

    averageBuyPrice:{
      type:"number",
      example:1895000
    }
  }
};

export const transactionSchema = {
  type: "object",
  properties: {
    id:{
      type:"string"
    },

    type:{
      type:"string",
      example:"BUY"
    },

    gram:{
      type:"number",
      example:2
    },

    totalPrice:{
      type:"number",
      example:3800000
    }
  }
};

export const goldPriceSchema = {
  type:"object",
  properties:{
    buyPrice:{
      type:"number",
      example:1900000
    },

    sellPrice:{
      type:"number",
      example:1850000
    }
  }
};
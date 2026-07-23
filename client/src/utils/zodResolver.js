export const zodResolver = (schema) => async (values) => {
  const result = schema.safeParse(values);

  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const errors = {};

  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    if (!errors[path]) {
      errors[path] = { type: issue.code, message: issue.message };
    }
  }

  return { values: {}, errors };
};

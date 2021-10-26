const removeUser = async user => {
  try {
    const result = await $requestService.apiReq(
      `/security/users?role_ids=${user}`,
      {},
      "DELETE"
    );
    if (result.data.error !== 0) {
      throw new Error(result.data.message);
    }
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
};
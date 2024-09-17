import { api } from "./index";

const profilesApi = api.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: () => ({
        url: "/auth/profile",
      }),
    })
  }),
});

export const { useProfileQuery } = profilesApi;
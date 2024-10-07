import axios from "axios"

class Api {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
    this.apiClient = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })

    this.apiClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 ||
            error.response.data.error === "Unauthorized")
        ) {
          this.removeUserData()
        }
        return Promise.reject(error)
      }
    )
  }

  storeUserData(userData) {
    localStorage.setItem("userData", JSON.stringify(userData.user))
    localStorage.setItem("token", userData.token)
  }

  removeUserData() {
    localStorage.removeItem("userData")
    localStorage.removeItem("token")
  }

  isUserDataAvailable() {
    const userData = JSON.parse(localStorage.getItem("userData"))
    return userData !== null
  }

  handleError(error) {
    if (error.response) {
      const { data, status } = error.response
      if (typeof data === "object" && data !== null) {
        return { error: data, status }
      } else {
        return { error: { message: data || "An error occurred" }, status }
      }
    } else if (error.request) {
      return {
        error: { message: "No response received from server" },
        status: 0,
      }
    } else {
      return { error: { message: error.message }, status: 0 }
    }
  }

  async register(email, password) {
    try {
      const response = await this.apiClient.post("/users", {
        user: { email, password },
      })
      this.storeUserData(response.data)
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async login(email, password) {
    console.log("login", email, password)
    try {
      const response = await this.apiClient.post("/users/sign_in", {
        user: { email, password },
      })
      this.storeUserData(response.data)
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async logout() {
    this.removeUserData()
    try {
      const response = await this.apiClient.delete("/users/sign_out")
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async getUser() {
    if (!this.isUserDataAvailable()) {
      return {
        error: { message: "User not authenticated. Please log in." },
        status: 401,
      }
    }
    try {
      const response = await this.apiClient.get("/user")
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async updateUser(userData) {
    if (!this.isUserDataAvailable()) {
      return {
        error: { message: "User not authenticated. Please log in." },
        status: 401,
      }
    }
    try {
      const response = await this.apiClient.put("/user", { user: userData })
      this.storeUserData(response.data)
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async getDreams(deleted = false) {
    try {
      const params = {}
      if (deleted !== false) {
        params.deleted = deleted
      }

      const response = await this.apiClient.get("/api/v1/dreams", { params })
      console.log(response.data)
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async getDream(id) {
    try {
      const response = await this.apiClient.get(`/api/v1/dreams/${id}`)
      console.log(response)
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async createDream(dreamData) {
    try {
      const response = await this.apiClient.post("/api/v1/dreams", {
        dream: dreamData,
      })
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async updateDream(id, dreamData) {
    try {
      const response = await this.apiClient.put(`/api/v1/dreams/${id}`, {
        dream: dreamData,
      })
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  async deleteDream(id) {
    try {
      const response = await this.apiClient.delete(`/api/v1/dreams/${id}`)
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  // // GET /dreams/:dream_id/interpretations
  // async getInterpretations() {
  //   try {
  //     const response = await this.apiClient.get(
  //       `/api/v1/dreams/${dreamId}/interpretations`
  //     )
  //     return { data: response.data, status: response.status }
  //   } catch (error) {
  //     return this.handleError(error)
  //   }
  // }

  // GET /dreams/:dream_id/interpretations/:id
  async getInterpretation(dreamId) {
    try {
      const response = await this.apiClient.get(
        `/api/v1/dreams/${dreamId}/interpretations/`
      )
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  // POST /dreams/:dream_id/interpretations
  async createInterpretation(dreamId) {
    try {
      const response = await this.apiClient.post(
        `/api/v1/dreams/${dreamId}/interpretations`
      )
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }

  // PUT /dreams/:dream_id/interpretations/:id
  async updateInterpretation(dreamId, interpretationId, interpretationData) {
    try {
      const response = await this.apiClient.put(
        `/api/v1/dreams/${dreamId}/interpretations/${interpretationId}`,
        {
          interpretation: interpretationData,
        }
      )
      return { data: response.data, status: response.status }
    } catch (error) {
      return this.handleError(error)
    }
  }
}

export default new Api()

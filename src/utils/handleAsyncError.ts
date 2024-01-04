interface AsyncError {
  response?: {
    data?: {
      message?: string
    }
  }
  message?: string
}

export const handleAsyncError = (error: AsyncError, thunkAPI: any) => {
  const errorMessage =
    error.response?.data?.message || error.message || 'Unknown error'

  if (import.meta.env.DEV) {
    console.error(
      `%c${errorMessage}`,
      'color: red; background: yellow; font-size: 20px'
    )
  } else {
    // Log to an external service or a file
  }

  return thunkAPI.rejectWithValue(errorMessage)
}

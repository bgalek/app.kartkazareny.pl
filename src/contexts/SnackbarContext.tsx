import { Alert, IconButton, Snackbar } from "@mui/material";
import React, { ReactChildren, ReactElement, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ContextProps {
  showSnackbar: (message: string, error?: boolean) => void;
}

interface ProviderProps {
  children: ReactChildren | ReactElement | ReactElement[];
}

interface SnackbarData {
  isVisible: boolean;
  message: string;
  error: boolean;
}

const DEFAULT_SNACKBAR_DATA: SnackbarData = {
  isVisible: false,
  message: "",
  error: false,
};

export const SnackbarContext = React.createContext<ContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  showSnackbar: (message: string, error: boolean = false) => {},
});

export const SnackbarContextProvider = ({
  children,
}: ProviderProps): ReactElement => {
  const [snackbarData, setSnackbarData] = useState<SnackbarData>(
    DEFAULT_SNACKBAR_DATA
  );

  const hideSnackbar = () => {
    setSnackbarData(DEFAULT_SNACKBAR_DATA);
  };

  const showSnackbar = (message: string, error: boolean = false) => {
    setSnackbarData({
      isVisible: true,
      message,
      error,
    });
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={hideSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbarData.isVisible && (
        <Snackbar
          open={snackbarData.isVisible}
          autoHideDuration={4000}
          onClose={hideSnackbar}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <Alert
            onClose={hideSnackbar}
            severity={snackbarData.error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {snackbarData.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

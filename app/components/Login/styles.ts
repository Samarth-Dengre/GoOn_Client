export const FormContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "55ch",
  height: "40%",
  margin: "auto",
  padding: "2ch",
  backgroundColor: "white",
  borderRadius: "1ch",
  boxShadow: "0 0 1ch 0.5ch rgba(0, 0, 0, 0.2)",
  //   add media query
  "@media screen and (max-width: 550px)": {
    width: "85vw",
    height: "100%",
  },
};

export const InputFields = {
  m: "auto",
  mb: "2ch",
  width: "50ch",
  //   add media query
  "@media screen and (max-width: 550px)": {
    width: "100%",
  },
};

export const SubmitButton = {
  width: "8rem",
  height: "2.5rem",
  color: "white",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
};

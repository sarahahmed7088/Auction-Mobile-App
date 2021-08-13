import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  StyledContainer: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
  },
  InnerContainer: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  PageLogo: {
    width: 400,
    height: 200,
  },
  PageTitle: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
    color: "#34a2da",
    padding: 10,
  },
  SubTitle: {
    fontSize: 22,
    marginBottom: 20,
    letterSpacing: 1,
    fontWeight: "bold",
    color: "#666",
    borderColor: "#34a2da",
    borderBottomWidth: 2,
    padding: 5,
  },
  StyledFormArea: {
    width: "90%",
  },
  StyledButton: {
    padding: 10,
    backgroundColor: "#34a2da",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 7,
    height: 40,
  },
  ButtonText: {
    fontSize: 18,
    color: "#fff",
  },
  Line: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
  ExtraView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    color: "#666666",
  },
  ExtraText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 14,
  },
  TextLink: {
    justifyContent: "center",
    alignItems: "center",
  },
  TextLinkContent: {
    color: "#34a2da",
    fontSize: 14,
    marginLeft: 4,
  },

  LeftIcon: {
    left: 15,
    top: 17,
    position: "absolute",
    zIndex: 1,
    color: "#34a2da",
  },
  RightIcon: {
    right: 15,
    top: 20,
    position: "absolute",
    zIndex: 1,
  },
  StyledTextInput: {
    padding: 15,
    paddingLeft: 55,
    paddingRight: 55,
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    fontSize: 14,
    height: 60,
    marginVertical: 2,
    marginBottom: 12,
  },
  radioBtn: {
    flexDirection: "column",
  },
  ErrorMsg: {
    fontWeight: "bold",
    color: "crimson",
  },
});

export default styles;

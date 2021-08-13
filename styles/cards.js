import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {

   borderRadius:6,
    marginHorizontal:5,
    marginVertical:18,

    backgroundColor:"white",
    width:320,
    borderColor: "transparent",
    // margin: 10,
    borderColor: "#ddd",
    shadowColor: "#ddd",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 4,
  },
  cardAuction:{
    borderRadius:6,
    marginVertical:10,
    marginBottom:10,
    width:320,
    height:400,
    backgroundColor:"white",
    borderColor: "transparent",
    borderColor: "#ddd",
    shadowColor: "#ddd",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 4,
  },
  productImage: {
    width: "100%",
    height: 230,
    borderWidth: 1,
    borderColor: "transparent",
 
  },
  container: {
    padding: 5,
    marginHorizontal:3,
    marginVertical:5
  },
  title: {
    fontWeight: "bold",
  },
  body: {
    marginBottom: 3,
    fontSize: 14,
    textAlign: "left",
  },
  btn: {
    backgroundColor: "#34a2da",
    borderWidth: 1,
    borderColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    
    marginVertical:3,
    width: 150,
    // margin: "auto",
    // marginTop: 5,
  },
  btnSection:{
    width:'100%',
    justifyContent:"center",
    alignItems:"center"
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
  },
  expDate: {
    borderRadius: 5,
    padding: 5,
    borderWidth: 2,
    borderColor: "#34a2da",
    flexDirection: "row",
    width: 200,
    justifyContent: "space-between",
  },
  expDateItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#666666",
  },
  dateTime: {
    padding: 3,
    margin: 3,
  },
  line: {
    borderBottomColor: "#34a2da",
    borderBottomWidth: 2,
  },
  safeareaStylefordetails: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  safeareaStyle: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    marginVertical: 10,
    marginRight: 10,
    marginHorizontal: 10,
    fontSize: 15,
    color: "black",
  },
  touchableOpacity: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 6,
    width: 230,
  },
  container: { flex: 1, justifyContent: "space-between", alignItems: "center" },

  text: {
    marginVertical: 10,
    marginRight: 10,
    marginHorizontal: 10,
    fontSize: 15,
    color: "black",
  },
  touchableOpacity: {
    backgroundColor: "#ffffff",
    alignSelf: "center",
    paddingHorizontal: 50,
    marginVertical: 10,
    borderRadius: 6,
    width: 230,
  },
});

export default styles;

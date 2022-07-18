import React, { useState, useContext } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { FintocWidgetView } from "@fintoc/fintoc-react-native";

const onSuccess = () => {
  console.log("SUCCESS");
};

const onExit = () => {
  console.log("EXIT");
};

const FintocContext = React.createContext({
  openFintoc: false,
  setOpenFintoc: () => {},
});

function FintocWidgetScreen() {
  const { opentFintoc, setOpenFintoc } = useContext(FintocContext);
  const options = {
    public_key: "",
    holder_type: "",
    product: "",
    country: "",
    widget_token: "",
    webhook: "",
  };
  if (opentFintoc) {
    return (
      <FintocWidgetView
        options={options}
        onSuccess={() => {
          setOpenFintoc(false);
          onSuccess();
        }}
        onExit={() => {
          setOpenFintoc(false);
          onExit();
        }}
      />
    );
  } else {
    return <Text style={styles.textCenter}>Widget waiting to be opened</Text>;
  }
}

function ButtonOpenWidget() {
  const { opentFintoc, setOpenFintoc } = useContext(FintocContext);
  if (!opentFintoc) {
    return (
      <TouchableOpacity
        onPress={() => {
          setOpenFintoc((state) => !state);
        }}
        title="Open Fintoc!"
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Fintoc!</Text>
      </TouchableOpacity>
    );
  }
  return null;
}

export default Fintoc = () => {
  const [opentFintoc, setOpenFintoc] = useState(false);
  const fintocContext = { opentFintoc, setOpenFintoc };
  return (
    <View style={styles.container}>
      <FintocContext.Provider value={fintocContext}>
        <ButtonOpenWidget></ButtonOpenWidget>
        <FintocWidgetScreen></FintocWidgetScreen>
      </FintocContext.Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    backgroundColor: "#3753ff",
    padding: 10,
  },
  buttonText: {
    alignSelf: "center",
    color: "#fff",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 8,
    width: "100%",
    height: "100%",
  },
  textCenter: {
    alignSelf: "center",
  },
  fintocContainer: {
    marginTop: 20,
    maxHeight: 200,
    width: 320,
  },
});

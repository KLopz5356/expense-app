import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

// type Pokemon
interface Pokemon {
  name: string;
  url: string;
  details?: any;
  image?: string;
  imageBack?: string;
  imageShiny?: string;
  types?: PokemonType[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export default function Details() {
  const params = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (params.url) {
      fetchPokemonDetails(params.url.toString());
    }
  }, [params.url]);

  async function fetchPokemonDetails(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPokemon(data);
      console.log("Fetched Pokemon Details:", data);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  }

  console.log("Params:", params);
  return (
    <>
      <Stack.Screen
        options={{
          title: params.name?.toString()?.toUpperCase() || "Pokemon Details",
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: params.image?.toString() }}
          style={{ width: 200, height: 200 }}
        ></Image>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
          {params.name?.toString()?.toUpperCase()}
        </Text>
      </View>
    </>
  );
}

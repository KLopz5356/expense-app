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

// // type Pokemon
// interface Pokemon {
//   name: string;
//   url: string;
//   details?: any;
//   image?: string;
//   imageBack?: string;
//   imageShiny?: string;
//   types?: PokemonType[];
// }

// interface PokemonType {
//   slot: number;
//   type: {
//     name: string;
//     url: string;
//   };
// }

// const colorByType = {
//   normal: "#A8A77A",
//   fire: "#EE8130",
//   water: "#6390F0",
//   electric: "#F7D02C",
//   grass: "#7AC74C",
//   ice: "#96D9D6",
//   fighting: "#C22E28",
//   poison: "#A33EA1",
//   ground: "#E2BF65",
//   flying: "#A98FF3",
//   psychic: "#F95587",
//   bug: "#A6B91A",
//   rock: "#B6A136",
//   ghost: "#735797",
//   dragon: "#6F35FC",
//   dark: "#705746",
//   steel: "#B7B7CE",
//   fairy: "#D685AD",
// };

// export default function Index() {
//   const [Pokemons, setPokemons] = useState<Pokemon[]>([]);

//   // console.log("Pokemon: ", JSON.stringify(Pokemons[0], null, 2));
//   useEffect(() => {
//     // fetch pokemon
//     fetchPokemon();
//   }, []);

//   async function fetchPokemon() {
//     try {
//       const response = await fetch(
//         "https://pokeapi.co/api/v2/pokemon?limit=30",
//       );
//       const data = await response.json();

//       const detailedPokemons = await Promise.all(
//         data.results.map(async (pokemon: any) => {
//           const res = await fetch(pokemon.url);
//           const details = await res.json();
//           return {
//             name: pokemon.name,
//             url: pokemon.url,
//             details, // You can choose to store specific details if needed
//             image: details.sprites?.front_default || null,
//             imageBack: details.sprites?.back_default || null,
//             imageShiny: details.sprites?.front_shiny || null,
//             types: details.types,
//           };
//         }),
//       );
//       setPokemons(detailedPokemons);
//       console.log("Fetched Pokemon:", detailedPokemons[0]);
//     } catch (error) {
//       console.error("Error fetching pokemon:", error);
//     }
//   }

//   return (
//     <>
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         contentContainerStyle={{
//           paddingHorizontal: 5,
//           paddingTop: 5,
//           paddingBottom: 5,
//         }}
//         style={{ marginTop: 20, paddingHorizontal: 10 }}
//       >
//         {Pokemons.map((pokemon) => (
//           <Link
//             key={pokemon.name}
//             href={{
//               pathname: "/details",
//               params: { name: pokemon.name, image: pokemon.image },
//             }}
//             style={{
//               padding: 10,
//               backgroundColor:
//                 // @ts-ignore
//                 colorByType[pokemon.types?.[0].type.name] + 80 || "#9c9797",
//               borderBottomWidth: 1,
//               borderRadius: 20,
//               marginBottom: 10,
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-evenly",
//                 alignItems: "center",
//                 width: "100%",
//               }}
//             >
//               <Image
//                 source={{ uri: pokemon.image }}
//                 style={{ width: 96, height: 96 }}
//               ></Image>
//               <Image
//                 source={{ uri: pokemon.imageBack }}
//                 style={{ width: 96, height: 96 }}
//               ></Image>
//               <Image
//                 source={{ uri: pokemon.imageShiny }}
//                 style={{ width: 96, height: 96 }}
//               ></Image>
//             </View>
//             <View style={{ width: "100%", alignItems: "center" }}>
//               <Text style={styles.pokemonName}>
//                 {pokemon.name.toUpperCase()}
//               </Text>
//               <Text style={styles.type}>
//                 {pokemon.types?.[0]?.type?.name?.toUpperCase()}
//               </Text>
//             </View>
//           </Link>
//         ))}
//       </ScrollView>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   name: {
//     fontSize: 22,
//     fontWeight: "bold",
//   },
//   pokemonName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   type: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#8f8f8f",
//   },
// });

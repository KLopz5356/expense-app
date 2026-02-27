import React, { useMemo, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  placeholder?: string;
  value: string | null;
  options: SelectOption[];
  onChange: (nextValue: string) => void;

  searchable?: boolean;
  disabled?: boolean;
};

export function Select({
  label,
  placeholder = "Select...",
  value,
  options,
  onChange,
  searchable = true,
  disabled = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selected = useMemo(
    () => options.find((o) => o.value === value) ?? null,
    [options, value],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
    );
  }, [options, query]);

  return (
    <View className="w-full">
      {!!label && <Text className="text-gray-300 mb-2">{label}</Text>}

      <Pressable
        disabled={disabled}
        onPress={() => {
          setQuery("");
          setOpen(true);
        }}
        className={`w-full rounded-2xl border px-4 py-3 flex-row items-center justify-between
          ${disabled ? "opacity-50" : "opacity-100"}
          border-gray-700 bg-[#252B38]`}
      >
        <Text className={`${selected ? "text-white" : "text-gray-400"}`}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text className="text-gray-400">▾</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* backdrop */}
        <Pressable
          className="flex-1 bg-black/60"
          onPress={() => setOpen(false)}
        />

        {/* sheet */}
        <View className="absolute left-0 right-0 bottom-0 bg-[#0b1220] rounded-t-3xl border-t border-gray-800 p-4">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-white text-lg font-semibold">
              {label ?? "Select"}
            </Text>
            <Pressable onPress={() => setOpen(false)} className="px-3 py-2">
              <Text className="text-gray-300">Close</Text>
            </Pressable>
          </View>

          {searchable && (
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search..."
              placeholderTextColor="#94a3b8"
              className="w-full rounded-xl border border-gray-700 bg-[#0f172a] px-4 py-3 text-white mb-3"
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.value}
            keyboardShouldPersistTaps="handled"
            style={{ maxHeight: 320 }}
            ItemSeparatorComponent={() => (
              <View className="h-[1px] bg-gray-800" />
            )}
            ListEmptyComponent={() => (
              <View className="py-6">
                <Text className="text-gray-400 text-center">No results</Text>
              </View>
            )}
            renderItem={({ item }) => {
              const isSelected = item.value === value;

              return (
                <Pressable
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className="py-4 px-2 flex-row items-center justify-between"
                >
                  <Text
                    className={`text-base ${isSelected ? "text-white" : "text-gray-200"}`}
                  >
                    {item.label}
                  </Text>
                  {isSelected && <Text className="text-white">✓</Text>}
                </Pressable>
              );
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

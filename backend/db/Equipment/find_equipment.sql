SELECT table1.charactersequipment_key, table1.equipment_key, equipment_name, slot, equipment_description, equipment_effect_stat, equipment_effect_stat_value, equipped, equipment_icon
FROM charactersequipment as table1
INNER JOIN equipment as table2
ON table1.equipment_key = table2.equipment_key WHERE character_key = $1;
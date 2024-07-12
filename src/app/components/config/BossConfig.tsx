import {
  Divider,
  FormControl,
  FormGroup,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
  Table,
  TableCell,
  TableRow,
} from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks"
import type { Form, Style } from "../../types"
import { HeroType } from "../../types"
import {
  setArchetype,
  setForm,
  setStyle,
  setType,
} from "../../../features/hero/heroSlice"
import { archetypes, bossArchetypes, forms, styles } from "../../textContent"
import { FormSelector, StyleSelector } from "./selectors"

const ArchetypeSelector = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  const options = [...archetypes, ...bossArchetypes]
  return (
    <Select
      value={hero.archetypes[0].name}
      onChange={e => {
        dispatch(
          setArchetype({
            archetypeName: e.target.value,
            number: 0,
          }),
        )
        dispatch(setType(HeroType.Fused))
      }}
    >
      {options.map(arch => (
        <MenuItem key={arch.name} value={arch.name}>
          {arch.name}
        </MenuItem>
      ))}
    </Select>
  )
}

export const BossConfig = () => {
  return (
    <>
      <Table>
        <TableRow>
          <TableCell align="right">Archetype:</TableCell>
          <TableCell>
            <ArchetypeSelector />
          </TableCell>
        </TableRow>
      </Table>
      <Divider>Stances</Divider>
      <Stack spacing={1} direction={"row"}>
        {[0, 1, 2].map((i) =>
          <FormGroup className="stanceFormGroup">
            <FormControl sx={{ m: 1 }}>
              <StyleSelector fromArchetypes={[]} index={i} />
              <FormHelperText>Style {i + 1}</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <FormSelector index={i} />
              <FormHelperText>Form {i + 1}</FormHelperText>
            </FormControl>
          </FormGroup>
        )}
      </Stack>
    </>
  )
}

// 
// TODO implement dnd
// 
// 
// 
// import { INPUT_DATA_ASSETS, RANGE_OPTIONS } from "./inputDataAssets";
// import ClearIcon from "@mui/icons-material/Clear";
// import EditIcon from "@mui/icons-material/Edit";
// import { Box, Button, Chip, Container, Typography } from "@mui/material";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
// import { useTheme } from "@mui/material/styles";
// import { AI } from "./Form/Form";
// import { useState, useEffect } from "react";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "react-beautiful-dnd";

// interface ICardsProps {
//   cards: AI[];
//   onDelete: (index: number) => void;
//   onEdit: (ai: AI) => void;
//   onReorder: (cards: AI[]) => void;
// }

// interface ICardsInfoProps {
//   title: string;
//   info: string | string[];
// }
// const CardsInfo: React.FC<ICardsInfoProps> = ({ title, info }) => {
//   const theme = useTheme();
//   return (
//     <Container
//       sx={{
//         display: "flex",
//         alignItems: "baseline",
//         gap: 2,
//         flexDirection: "row",
//         marginBottom: 2,
//       }}
//     >
//       <Typography
//         variant="h4"
//         color="text.primary"
//         sx={{
//           width: { xs: "5em", sm: "14.6em", md: "6.7em", lg: "14.6em" },
//           textAlign: "right",
//           flexShrink: 0,
//         }}
//       >
//         {title}
//       </Typography>
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "center",
//           gap: 1,
//         }}
//       >
//         {Array.isArray(info) ? (
//           info.map((option, index) => (
//             <Chip
//               key={index}
//               label={option}
//               sx={{
//                 margin: theme.spacing(0, 0.5),
//                 display: "flex",
//               }}
//             />
//           ))
//         ) : (
//           <Chip
//             label={info}
//             sx={{
//               margin: theme.spacing(0, 0.5),
//               padding: { xs: 0.5, sm: 1, md: 1.5 },
//             }}
//           />
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default function Cards({
//   cards,
//   onDelete,
//   onEdit,
//   onReorder,
// }: ICardsProps) {
//   const theme = useTheme();

//   const [cardsState, setCards] = useState(cards);
//   useEffect(() => {
//     setCards(cards);
//   }, [cards]);

//   const handleDragEnd = (result: DropResult) => {
//     if (!result.destination) {
//       return;
//     }

//     const _cards = [...cardsState];
//     const [removed] = _cards.splice(result.source.index, 1);
//     _cards.splice(result.destination.index, 0, removed);

//     setCards(_cards);
//     onReorder(_cards);
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Droppable droppableId="card-list" type="card">
//         {(provided) => (
//           <Box
//             ref={provided.innerRef}
//             {...provided.droppableProps}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 6,
//               overflowY: "auto",
//               maxHeight: "75vh",
//             }}
//           >
//             {cardsState.map((card, index) => (
//               <Draggable
//                 key={card.id}
//                 draggableId={card.id.toString()}
//                 index={index}
//               >
//                 {(provided) => (
//                   <Box
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     sx={{
//                       flexDirection: "column",
//                       paddingTop: 2,
//                       paddingBottom: 2,
//                       paddingLeft: { md: 0, lg: 2 },
//                       paddingRight: { md: 0, lg: 2 },
//                       maxWidth: { md: "90%", lg: "80%" },
//                       border: "2px solid",
//                       borderColor: theme.palette.text.primary,
//                       py: 2.5,
//                       borderRadius: 2,
//                       position: "relative",
//                       marginBottom: 5,
//                       bgcolor: "background.paper",
//                       "&::after": {
//                         content: '""',
//                         position: "absolute",
//                         bottom: {
//                           xs: theme.spacing(1),
//                           md: theme.spacing(0.875),
//                           lg: theme.spacing(1),
//                         },
//                         left: {
//                           xs: theme.spacing(1),
//                           sm: theme.spacing(2),
//                           md: theme.spacing(4),
//                         },
//                         right: {
//                           xs: theme.spacing(0.7),
//                           sm: theme.spacing(1),
//                           md: theme.spacing(2),
//                         },
//                         height: "2px",
//                         backgroundColor: theme.palette.text.primary,
//                       },
//                       "& > *:not(.MuiButton-root)": {
//                         pointerEvents: "auto",
//                       },
//                     }}
//                   >
//                     <CardsInfo
//                       title={INPUT_DATA_ASSETS[0].label}
//                       info={card.levelOfAI}
//                     />
//                     <CardsInfo
//                       title={INPUT_DATA_ASSETS[1].label}
//                       info={card.whereAIIsUsed}
//                     />
//                     <CardsInfo
//                       title={INPUT_DATA_ASSETS[2].label}
//                       info={card.TypeOfAI}
//                     />
//                     <CardsInfo
//                       title={RANGE_OPTIONS[0].label}
//                       info={card.rateAIIntelligence.toString()}
//                     />
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "flex-end",
//                         paddingRight: {
//                           xs: 2,
//                           sm: 4,
//                           md: 6,
//                         },
//                         marginBottom: -6,
//                       }}
//                     >
//                       <Button
//                         variant="contained"
//                         endIcon={<EditIcon />}
//                         onClick={() => onEdit(cards[index])}
//                         sx={{
//                           marginRight: 2.5,
//                           width: {
//                             xs: theme.spacing(13),
//                             sm: theme.spacing(16),
//                             lg: theme.spacing(18),
//                           },
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="contained"
//                         endIcon={<ClearIcon />}
//                         onClick={() => onDelete(index)}
//                         sx={{
//                           width: {
//                             xs: theme.spacing(16),
//                             sm: theme.spacing(20),
//                             lg: theme.spacing(24),
//                           },
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </Box>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

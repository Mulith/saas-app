import { Box, ButtonGroup, HStack, Text, Button } from "@chakra-ui/react";

export interface GridFooterProps {
    rows: number;
    start: number;
    results: number;
    onNext: () => void;
    onPrevious: () => void;
}

export const TableFooter = (props: GridFooterProps) => {
    const { rows, start, results, onNext, onPrevious } = props;
    const isPreviousDisabled = start === 0;
    const isNextDisabled = start + results > rows;

    return (
        <Box px={{ base: '4', md: '6' }} pb="5">
            <HStack spacing="3" justify="space-between">
                <Text color="fg.muted" textStyle="sm">
                    Showing {start + 1} to {Math.min(start + results, rows)} of {rows} results
                </Text>
                <ButtonGroup
                    spacing="3"
                    justifyContent="space-between"
                    width={{ base: 'full', md: 'auto' }}
                    variant="secondary"
                >
                    <Button onClick={onPrevious} isDisabled={isPreviousDisabled}>Previous</Button>
                    <Button onClick={onNext} isDisabled={isNextDisabled}>Next</Button>
                </ButtonGroup>
            </HStack>
        </Box>
    );
};

import dayjs from "dayjs";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface CalendarProps {
  date: Date;
}

const styles = StyleSheet.create({
  page: {
    padding: 12,
    backgroundColor: "#ffffff",
    flexDirection: "column",
  },
  header: {
    marginBottom: 6,
    borderBottom: "1 solid #000000",
    paddingBottom: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 2,
    color: "#000000",
  },
  subtitle: {
    fontSize: 7,
    textAlign: "center",
    color: "#000000",
  },
  gridContainer: {
    marginTop: 4,
  },
  yearRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0.5,
  },
  yearLabel: {
    width: 14,
    fontSize: 5,
    color: "#000000",
    textAlign: "right",
    marginRight: 2,
  },
  weekRow: {
    flexDirection: "row",
    gap: 0.8,
  },
  cell: {
    width: 10,
    height: 5.5,
    border: "0.3 solid #000000",
  },
  cellLived: {
    backgroundColor: "#000000",
  },
  cellFuture: {
    backgroundColor: "#ffffff",
  },
  footer: {
    marginTop: 4,
    paddingTop: 3,
    borderTop: "0.5 solid #000000",
    fontSize: 5.5,
    color: "#000000",
    textAlign: "center",
  },
});

export const Calendar = ({ date }: CalendarProps) => {
  const LIFE_EXPECTANCY = 80;
  const WEEKS_IN_YEAR = 52;
  const TOTAL_WEEKS = LIFE_EXPECTANCY * WEEKS_IN_YEAR;

  const dob = dayjs(date);
  const weeksLived = dayjs().diff(dob, "week");
  const yearsLived = dayjs().diff(dob, "year");
  const percentageLived = ((weeksLived / TOTAL_WEEKS) * 100).toFixed(1);

  const years = Array.from({ length: LIFE_EXPECTANCY }, (_, yearIndex) => {
    const weeks = Array.from({ length: WEEKS_IN_YEAR }, (_, weekIndex) => {
      const weekNumber = yearIndex * WEEKS_IN_YEAR + weekIndex;
      return weekNumber < weeksLived;
    });
    return { yearNumber: yearIndex, weeks };
  });

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>My life</Text>
          <Text style={styles.subtitle}>
            Born: {dob.format("MMMM D, YYYY")}
          </Text>
        </View>

        <View style={styles.gridContainer}>
          {years.map(({ yearNumber, weeks }) => (
            <View key={yearNumber} style={styles.yearRow}>
              <Text style={styles.yearLabel}>{yearNumber}</Text>
              <View style={styles.weekRow}>
                {weeks.map((isLived, weekIndex) => (
                  <View
                    key={weekIndex}
                    style={[
                      styles.cell,
                      isLived ? styles.cellLived : styles.cellFuture,
                    ]}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>
            Each row represents one year of life ({WEEKS_IN_YEAR} weeks) •
            Total: {LIFE_EXPECTANCY} years × {WEEKS_IN_YEAR} weeks ={" "}
            {TOTAL_WEEKS} weeks
          </Text>
        </View>
      </Page>
    </Document>
  );
};

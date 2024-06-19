# ioB.custom.trashschedule.card

Die `TrashSchedule`-Karte ist eine benutzerdefinierte Karte für ioBroker, die den nächsten Abholtermin für den Müll anzeigt. Sie zeigt den Typ des Mülls, die verbleibenden Tage bis zur Abholung und die Farbe des Mülleimers an.

## Installation

1. Lade die JavaScript-Datei der `TrashSchedule`-Karte in dein ioBroker-System hoch.
2. Füge die `TrashSchedule`-Karte zu deinem ioBroker-Dashboard hinzu.

## Konfiguration

Die `TrashSchedule`-Karte kann über die Konfigurationsoptionen angepasst werden. Hier sind die möglichen Optionen:

- `daysleft`: Die ID des Sensors, der die verbleibenden Tage bis zur nächsten Abholung anzeigt.
- `date`: Die ID des Sensors, der das Datum des nächsten Abholtermins anzeigt.
- `trashtype`: Der Typ des Mülls (z.B. Restmüll, Papier).
- `trashcolor`: Die ID des Sensors, der die Farbe des Mülleimers anzeigt.
- `locale`: Die Sprach- und Regionseinstellungen für die Datumsanzeige.
- `daySingular`: (Optional) Der Text für einen verbleibenden Tag.
- `dayPlural`: (Optional) Der Text für mehrere verbleibende Tage.

### Beispielkonfiguration

```yaml
type: custom:trashschedule-card
locale: de-DE
trashtype: Altpapier
trashcolor: sensor.altpapier_color
daysleft: sensor.altpapier_daysLeft
date: sensor.altpapier_nextDate
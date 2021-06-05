**********************
# WebGIS
## Πτυχιακή Εργασία 
### ΓΙΑΝΝΙΟΣ ΑΝΤΩΝΙΟΣ
### Π2013153


**********************
#### Version 1.11
#### 5-6-2021

- [x] Προστέθηκαν τα κουμπιά L, D, R, Μ με τα οποία εμφανίζονται αντίστοιχα τα layers (LGC Controlled Areas, LGD Danger Areas, LGR Restricted
      Areas, LGM Military Exercise Areas).
- [x] Δημιουργήθηκαν με χαρτογράφηση οι αντίστοιχοι πίνακες LGD_LAYER, LGD_LAYER, LGR_LAYER και LGM_LAYER στην Βάση Δεδομένων που περιέχουν
      τις αντίστοιχες περιοχές με τη μορφή πολυγώνων και κύκλων. Έγινε η κωδικοποίησή τους με τη χρήση του postGIS.
- [x] Δημιουργήθηκαν τα αντίστοιχα layer στον Geoserver και τα αντίστοιχα styles τους.
- [x] Μετονομάστηκε το κουμπί R που εμφανίζει το Route Layer σε r για να μην υπάρχει σύγχυση με το LGR Layer.
- [x] Προστέθηκε στη Βάση Δεδομένων ο πίνακας WAYPOINT_VFR_LAYER με όλα τα σημεία VFR όλης της χώρας. Δημιουργήθηκε το αντίστοιχο layer στον
      Geoserver. To layer αυτό με τα σημεία (waypoints) VFR εμφανίζεται στον χάρτη με την χρήση του κουμπιού V. Τα σημεία αυτά  χρησιμοποιούνται για πτήση Visual Flight Rules.
- [x] Έγινε ενημέρωση στο app.js του nodejs server ώστε να γίνεται αναζήτηση και στον πίνακα WAYPOINT_VFR_LAYER για τα σημεία VFR που θα εισάγει ο
      χρήστης στο FPL.

**********************
#### Version 1.10
#### 23-5-2021

- [x] Προστέθηκε κουμπί S με το οποίο εμφανίζεται φόρμα Strip Base, διάφανη, η οποία μπορεί να μετακινείται όπως και οι υπόλοιπες
      φόρμες και διαθέτει close icon με το οποίο κλείνει. Η φόρμα αυτή θα περιέχει τα strips από κάθε αφικνούμενη ή αναχωρούσα 
      πτήση. Επίσης μέσα από αυτή την φόρμα ο ελεγκτής θα μπορεί να διαβάσει το clearance (εξουσιοδότηση) προς τον πιλότο της
       πτήσης. <!-- Θα πρέπει να φτιάξω το zIndex της κάθε φόρμας και το υψηλότερο να το παίρνει η φόρμα που έχει το focus -->
- [x] Προστέθηκε κουμπί Τ με το οποίο ο ελεγκτής μπορεί να εμφανίσει τις Τερματικές Περιοχές (ΤMAs και MTMAs) της χώρας.
- [x] Δημιουργήθηκε ο πίνακας MTMA_LAYER στην Βάση Δεδομένων και στον οποίο αναπαρίστανται οι Τερματικές Περιοχές με την μορφή
      πολυγώνων και έγινε η κωδικοποίησή τους με τη χρήση του postGIS.
- [x] Δημιουργήθηκε το αντίστοιχο layer (MTMA_LAYER) στον Geoserver.


![Ver 1.10 Screenshot](https://github.com/p13gian1/WebGIS/blob/master/screenshots/ver_1-10.PNG)


**********************
#### Version 1.9
#### 16-5-2021

- [x] Προστέθηκε στην φόρμα Flight Plan και το υπόλοιπο μέρος του Supplementary Plan (το δεύτερο σκέλος του σχεδίου πτήσης το
      το οποίο αναφέρεται σε επιπλέον πληροφορίες του αεροσκάφους).
- [x] Η φόρμα του Flight Plan μπορεί να μετακινηθεί και αυτή πλέον όπως και η φόρμα A.I.P. Επίσης στην φόρμα A.I.P προστέθηκε
      close form icon με το οποίο ο χρήστης κλείνει την φόρμα.
- [x] H φόρμα A.I.P διορθώθηκε στυλιστικά με CSS ώστε να είναι ίδια με την Flight Plan φόρμα. Επίσης προστέθηκε το border-radius
      property στο CSS και των δύο, ώστε να έχουν στρογγυλεμένες γωνίες στο background. 
 

**********************
#### Version 1.8
#### 3-5-2021

- [x] Έγινε μετατροπή στην εμφάνιση των κύκλων γύρω από το αεροδρόμιο εργασίας, ώστε αυτοί να εμφανίζονται όπως στα πραγματικά
      radar, με κύκλους που έχουν εύρος από 5 n.m, 10 n.m και 30 n.m. Ο ελεγκτής πατώντας το κουμπί Ζ επαναλαμβανόμενα, 
      μπορεί τώρα να μεταπίπτει διαδοχικά μεταξύ τεσσάρων καταστάσεων, unvisible, 5, 10 και 30 n.m. Η μέγιστη ακτίνα του κύκλου
      παραμένει στα 60 n.m κάθε φορά.
- [x] Προστέθηκε στο σχεδιασμό του fpl route, πινακίδα πάνω σε κάθε segment η οποία αναγράφει τα σημεία waypoints τα οποία ενώνει 
      το συγκεκριμένο segment.
- [x] Έγινε μετατροπή στην βάση δεδομένων και στον nodejs server ώστε να ακολουθείται το πρότυπο του postGIS στην δημιουργία και
      απάντηση των queries. Τώρα τα γεωδαιτικά δεδομένα πολυπλέκονται και αποθηκεύονται σε μια δεκαεξαδική τιμή αντί για δύο τιμές
      (longitude και latitude). Χρησιμοποιείται η ίδια βάση δεδομένων (airGIS) η οποία τροφοδοτεί και τον Geoserver με γεωδαιτικά
      δεδομένα και η οποία τώρα πλέον απαντά και στα queries του nodejs. Η χρήση του postGIS θα μας βοηθήσει στο μέλλον,
      να έχουμε δυνατότητες όπως π.χ να απεικονίζουμε το αζιμούθιο μεταξύ δύο waypoints ή να υπολογίζουμε την απόσταση μεταξύ τους. 


**********************
#### Version 1.7
#### 29-4-2021

- [x] Εμφάνιση route στον χάρτη και στο σχέδιο πτήσης αναλόγως του waypoint που
      εισάγεται <!-- και δυνατότητα γραφικής μεταβολής του με το mouse) -->
- [x] Επίσης η διαδρομή route ελεγχέται για την ορθότητά της και αν ο χρήστης δώσει κάποια λάθος σημεία (waypoints),
      αυτά επισημαίνονται πάνω στο flight plan με βέλη αριστερά και δεξιά.
- [x] Αυτόματη μετατροπή των χαρακτήρων από μικρά σε κεφαλαία ώστε κατά την εισαγωγή να μην χρειάζεται ο χρήστης να
      έχει ενεργοποιημένο το CAPS LOCK.
- [x] Πρόσθεση εικονιδίων 'open file','save file' και 'close form' πάνω στην φόρμα εισαγωγής του σχεδίου πτήσης.
- [x] Η φόρμα εισαγωγής του σχεδίου πτήσης προτιμήθηκε να είναι αναδυόμενη διάφανη φόρμα πάνω στον χάρτη και όχι σε
      ξεχωριστή σελίδα, ώστε ο χρήστης να βλέπει άμεσα την διαδρομή πάνω στον χάρτη και να μην χρειάζεται να αλλάζει σελίδα.
- [x] Πρόσθεση κουμπιού 'Ζ' με το οποίο εμφανίζονται ομόκεντροι κύκλοι γύρω από το αεροδρόμιο εργασίας του ελεγκτή και δείχνουν
      την Τερματική Περιοχή του Αεροδρομίου (Aerodrome Terminal Zone A.T.Z). Ο κάθε κύκλος έχει διαφορά 5 ναυτικά μίλια από τον προηγούμενό του.
- [x] Προστέθηκε η δυνατότητα να αλλάζει το αεροδρόμιο εργασίας του ελεγκτή. Η αλλαγή γίνεται όταν επιλέγει ο ελεγκτης το αεροδρόμιο εργασίας του,
      μέσα από το μενού AFIS.


![Ver 1.7 Screenshot](https://github.com/p13gian1/WebGIS/blob/master/screenshots/ver_1-7.PNG)
![Ver 1.7 Screenshot](https://github.com/p13gian1/WebGIS/blob/master/screenshots/ver_1-7a.PNG)


**********************
#### Version 1.6
#### 24-4-2021

- [x] Εμφάνιση πάνω στην μπάρα της παγκόσμιας ώρας (UTC) καθώς και της UTC ημερομηνίας κατά ICAO format (Έτος-Μήνας-Ημέρα). Επίσης 
      εμφάνιση των συντεταγμένων που έχει το κέντρο του χάρτη.

![Ver 1.6 Screenshot](https://github.com/p13gian1/WebGIS/blob/master/screenshots/ver_1-6.PNG)


**********************
#### Version 1.5
#### 22-4-2021

- [x] Έγινε σμίκρυνση του πλάτους της μπάρας μενού στα 60px ώστε να μπορέσει να προστεθεί η μπάρα πληροφοριών στη βάση του χάρτη.
- [x] Πρόσθεση διάφανης μπάρας στη βάση του χάρτη πάνω στην οποία εμφανίζονται οι συντεταγμένες του κέντρου του χάρτη.
      Στην μπάρα αυτή θα εμφανίζονται οι συντεταγμένες του mouse πάνω στον χάρτη και άλλες πληροφορίες, όπως το πλησιέστερο αεροδρόμιο ή waypoint ή ραδιοβοήθημα
      (navaid) προς το κέντρο του χάρτη.
- [x] Πρόσθεση κουμπιού ('C') με το οποίο μαρκάρεται μονίμως το κέντρο του χάρτη με σταυρό. 
- [x] Δημιουργία φόρμας συμπλήρωσης Flight Plan και πρόσθεση κουμπιού ('F') για την εμφάνισή της.
- [x] Πρόσθεση κουμπιού ('A') για την μετάβαση στο AFTN Terminal. Έγινε διόρθωση του main menu, ώστε να εμφανίζεται η επιλογή του AFTN Terminal.
- [x] Έγινε διόρθωση ώστε να μετακινείται η φόρμα με τα στοιχεία των αεροδρομίων από το A.I.P, χωρίς την χρήση του πλήκτρου control αλλά μόνο με
      mouse drag.
- [x] Έγιναν διορθώσεις στα css των φορμών A.I.P και Flight Plan ώστε το κείμενο πάνω σε αυτές να μην είναι selectable.

![Ver 1.5 Screenshot](https://github.com/p13gian1/WebGIS/blob/master/screenshots/ver_1-5.PNG)


**********************
#### Version 1.4
#### 17-4-2021

- [x] Δημιουργία στο map tiler και δεύτερου βασικού χάρτη με αποχρώσεις λευκού και γαλάζιου.
- [x] Πρόσθεση κουμπιού ('Β') με το οποίο αλλάζει ο βασικός χάρτης (base map) από πράσινος σε γαλάζιο.
- [x] Γίνεται πλέον διαχείριση και διαχωρισμός όλων των layers σύμφωνα με το είδος τους. Έτσι, στην εναλλαγή των χαρτών. με το παραπάνω κουμπί, υπολογίζεται η θέση
      που έχει το base layer στο layer stack και αφαιρείται. Επίσης με τον ίδιο τρόπο όταν χρειαστεί να γίνει εμφάνιση του route που έχουν τα αεροσκάφη, το visibility
      (true or false) εμφαρμόζεται μόνο στα route layers.

**********************
#### Version 1.3
#### 11-4-2021

- [x] Επιδιόρθωση του offset και εμφάνιση πλέον στην σωστή θέση των labels από όλα τα layers. (π.χ waypoints, airways κ.λπ). Η επιδιόρθωση έγινε με την τροποποίηση του
      xml αρχείου (SLD) που χρησιμοποιεί ο Geoserver για το styling των layers που σερβίρει.
- [x] Εμφάνιση του route που ακολουθεί κάθε αεροσκάφος με διαφορετικό χρώμα.
- [x] Πρόσθεση κουμπιού ('R') με λειτουργία toggle που είτε εμφανίζει τις πορείες όλων των πτήσεων με διαφορετικό χρώμα (παραπάνω μηχανισμός) είτε όχι. 


**********************
#### Version 1.2
#### 7-4-2021

- [x] Δημιουργία διαφορετικών sprite αεροσκαφών με το καθένα να έχει διαφορετικό
      callsign, διαφορετικό velocity και να αντιστοιχεί σε διαφορετικό object.
      Τα objects προς στιγμήν είναι test arrays αλλά μελλοντικά θα αντιστοιχούν σε αυτά που θα εισάγονται από την BΔ.


**********************
#### Version 1.1
#### 1-4-2021

- [x] Προστέθηκε στο repository ο φάκελος Qgis με το αρχείο του Qgis και τα SLD αρχεία
      των layers τα οποία έγιναν import στον Geoserver
- [x] Προστέθηκε στο repository ο φάκελος postgreSQL_files που περιλαμβάνει τα αρχεία
      που χρησιμοποιήθηκαν για την δημιουργία της ΒΔ


**********************
#### Version 1
#### 31-3-2021
  
- [x] Δημιουργία BaseLayer Map στο Maptiler.com στα χρώματα του χάρτη των radar Π.Ε.Α
- [x] Εισαγωγή στοιχείων και δημιουργία χάρτη στο QGIS
- [x] Στήσιμο του Geoserver και δημιουργία layers IFR low με import από το QGIS
- [x] Καταχώρηση στην ΒΔ των αεροδρομίων, waypoints, airways, navaids (ραδιοβοηθήματα)
- [x] Εμφάνιση Call sign label, Velocity Label, Flight Level label πάνω από το sprite
      του αεροσκάφους
- [x] Δυνατότητα απεικόνισης αεροσκάφους είτε με font αεροσκάφους είτε με απλή κουκίδα
- [x] Δημιουργία βασικού περιβάλλοντος του client
- [x] Δημιουργία μενού με χρήση του bootstrap
- [x] Δημιουργία κουμπιών για Fullscreen, χάρτη VFR, IFR low και IFR high ('V'),('IL'),('IH')
- [x] Κίνηση αεροσκάφους με sprite και αντίστοιχου testing button 
- [x] Δημιουργία του nodejs και δυνατότητα qeuries από τον client στην ΒΔ μέσω του
      nodejs
- [x] Καταχώρηση στοιχείων στη ΒΔ με βάση το AIP για όλα τα αεροδρόμια της Ελλάδος
- [x] Εμφάνιση στοιχείων από το Α.Ι.P (Aeronautical Infromation Publication)
      αεροδρομίων με right click σε διάφανη φόρμα με δυνατότητα μετακίνησης με χρήση του CTRL button και του mouse

   

- [ ] Δημιουργία ruler εργαλείου για μέτρηαη απόστασης στον χάρτη
- [ ] Δημιουργία Strip Base φόρμας
- [ ] Δημιουργία layers για VFR και IFR high διαδρομές
- [ ] Προτεινόμενες διαδρομές (routes) στο σχέδιο πτήσης σύμφωνα με παλαιότερα
      καταχωρημένα σχέδια
- [ ] Εμφάνιση AFTN addresses στο σχέδιο πτήσης που πρόκειται να αποσταλεί στο δίκτυο
      AFTN
- [ ] Εμφάνιση συχνοτήτων αεροδρομίων και τομέων
- [ ] Παρακολούθηση (active και preview) πορείας ενός αεροσκάφους με teleport άλλον
      χάρτη (split screen)
- [ ] Εμφάνιση Standard Instrument Departure (S.I.D Διαδικασία Αναχώρησης) και
      Standard Arrival
      (ST.AR Διαδικασία Άφιξης) σε εικόνες
- [ ] Εμφάνιση timeslots (αφίξεις και αναχωρήσεις)  από υποβληθέντα σχέδια πτήσης για
      οποιοδήποτε αεροδρόμιο
- [ ] Εμφάνιση και συμπλήρωση Clearance (Διαδικασία απογείωσης) από τον ελεγκτή και το
      σχέδιο πτήσης
- [ ] Ειδοποίηση για NOTAMs αεροδρομίου που πλησιάζει η ημερομηνία λήξης τους και θα
      πρέπει να ανανεωθούν από τον ελεγκτή
- [ ] Εμφάνιση προτεινόμενου διαδρόμου σε σχέση με τον παρόντα άνεμο αεροδρομίου
- [ ] Εμφάνιση προειδοποιήσεων στον χάρτη για επικίνδυνο καιρό με βάση METARs ή TAFs
- [ ] Εμφάνιση resticted περιοχών με βάση ΝΟΤΑΜs
- [ ] Υπολογισμός αν είναι εντός ορίων ώρας VFR ένα σχέδιο πτήσης ή αν το αεροδρόμιο
      προορισμού είναι κλειστό λόγω ωραρίου
- [ ] Flight Data Processing και AFTN Data Processing 
- [ ] Drag and Drop στον χάρτη νέου αεροσκάφους που καλεί τον Πύργο Ελέγχου
      Αεροδρομίου και δεν έχει σχέδιο πτήσης (Π.Ε.Α)
      και δυνατότητα απεικόνισης παρούσας θέσης στον χάρτη με βάση τα στοιχεία που αυτό δίνει στον αέρα
- [ ] Themes
- [ ] ΝΟΤΑΜs
- [ ] METARs





         

export default function convertDocToObj(doc) {
    console.log(doc);
    doc._id = doc._id.toString();
    doc.createdAt = doc.createdAt.toString();
    doc.updatedAt = doc.updatedAt.toString();
    if(doc.paidAt && doc.user) {
        doc.paidAt = doc.paidAt.toString();
        doc.user = doc.user.toString();
    }
    return doc;
}
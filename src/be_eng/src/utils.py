from db import *
from random import randrange,sample
def check_require(list_data,data):
    list_require = []
    for key in list_data:
        if not data[key]:
            list_require.append(key)
    if list_require:
        return {"status": False, "message": "Enter {}".format(", ".join(list_require))}
    return {"status": True}
def add_allcolection_to_table():
    results = show_allcolection()
    print(results)
    for topic in results:
        info = {
            "idi": topic,
            "topic": topic,
            "level": 12,
            "favorite": 0
        }
        print()
        m = insert_document('ignor_topics', info, 'topic')
        print(m)
    return True
def insert_topic():
    info = {
        "idi": 'electronics',
        "topic": 'electronics',
        "level": 12,
        "order": 1,
        "favorite": 0
    }
    m = insert_document('igno_topics', info, 'topic')
    print(m)
    return m
def get_topics():
    topics = get_all_record('ignor_topics', {})
    ignore = ['none','user', 'ig_topics','igr_topics']
    result = [topic for topic in topics if topic['topic'] == 'user']
    print(result)
    return result
def add_filed():
    res = update_document('ignor_topics', {},{"order": 1})
def get_top():
    list_ext_id = get_records_top('electronics', "level", 1, 21).get("data")
    print(list_ext_id)
    am = sample(range(50, 54), 4)
    print(am)

    return 0
def difficult():
    print(get_difficult())
    return 0
if __name__ == '__main__':
    # print(add_allcolection_to_table())
    # get_topics()
    # insert_topic()
    # add_filed()
    # get_top()
    add_allcolection_to_table()
    # difficult()

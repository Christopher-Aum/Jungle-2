from app.models import Item, db, environment, SCHEMA
from sqlalchemy.sql import text

def item_seed(all_users):
    item1 = Item(title='Alienware R16', body='NEW Dell AlienWare Aurora R16 Gaming Desktop 14th Gen Intel i9 14900KF 24-Core 64GB RAM 4TB SSD GeForce RTX 4090 Graphics Wi-Fi 6E Win 11 1000W Platinum Rated PSU Liquid Cooling 【Clear Side Panel 】', image='https://jungle-capstone.s3.amazonaws.com/Alienware-Computers-1.jpg', type='Computers', user_id=1)
    item2 = Item(title='HP Pavilion', body="Create without limits on the world's GREATEST All-in-One HP Pavilion 32 PC. Massive 32-inch IPS, three-sided micro-edge, antiglare, 350 nits, 98% DCI-P3, Non-touch screen. Non-reflective and low gloss means you'll get less glare. You can bring your videos and photos projects to life like a pro at home. Designed to impress, captivate, and inspire with a 32-inch diagonal display. All wrapped in a STUNNINGLY GORGEOUS All-in-One design packing EXTREME TOP OF THE LINE computing power available today.", image='https://jungle-capstone.s3.amazonaws.com/HP-Computers-2.jpg', type='Computers', user_id=1)
    item3 = Item(title='Lenovo Legion T5', body="【High Speed RAM And Enormous Space】32GB high-bandwidth RAM to smoothly run multiple applications and browser tabs all at once; 1TB WD_black PCIe NVMe M.2 Solid State Drive allows to fast bootup and data transfer", image='https://jungle-capstone.s3.amazonaws.com/Lenovo-Computers-3.jpg', type='Computers', user_id=1)
    item4 = Item(title='Alienware M18', body="COMMANDING POWER & PRESENCE: Outplay your rivals and show them who's boss with overclockable13th Gen Intel Core processors and NVIDIA GeForce RTX 40 Series graphics.", image='https://jungle-capstone.s3.amazonaws.com/Alienware-Laptop-Computers-4.jpg', type='Computers', user_id=1)
    item5 = Item(title='Dell XPS 9530', body="【 High-Speed RAM And Enormous Space】64GB high-bandwidth DDR5 RAM to smoothly run multiple applications and browser tabs simultaneously, support your professional work and entertaining; 4TB PCIe NVMe M.2 Solid State Drive allows fast bootup and data transfer.", image='https://jungle-capstone.s3.amazonaws.com/Dell-Computers-5.jpg', type='Computers', user_id=1)
    item6 = Item(title='Samsung 24 Ultra ', body="CIRCLE & SEARCH¹ IN A SNAP: What’s your favorite influencer wearing? Where’d they go on vacation? What’s that word mean? Don’t try to describe it — use Circle to Search1 with Google to get the answer; With S24 Series, circle it on your screen and learn more", image='https://jungle-capstone.s3.amazonaws.com/Samsung-Electronics-1.jpg', type='Electronics', user_id=1)
    item7 = Item(title='Google Pixel 8 Pro', body="Pixel 8 Pro is the all-pro phone engineered by Google; it’s super fast, powerful, and secure, with the new Google Tensor G3 chip that’s custom-designed with Google AI for cutting-edge photo and video features and smarter ways to help[1]", image='https://jungle-capstone.s3.amazonaws.com/Google-Electronics-2.jpg', type='Electronics', user_id=1)
    item8 = Item(title='Motorola Razr+', body="Compatible with T-Mobile 5G and Verizon 5G. Ready for 5G on other select networks dependent on availability; contact your service provider for details. Compatible with all major 4G U.S. carriers, including Verizon, AT&T, and T-Mobile. It also works with prepaid carriers, including Cricket Wireless, Metro by T-Mobile, Simple Mobile, Total Wireless, Tracfone, Net10, Mint, TracFone, and H2O.", image='https://jungle-capstone.s3.amazonaws.com/Motorola-Electronics-3.jpg', type='Electronics', user_id=1)
    item9 = Item(title='LG C3 TV', body="LG OLED EVO: The LG OLED evo is powered by the a9 AI Processor Gen6—made exclusively for LG OLED—for beautiful picture and performance. The Brightness Booster improves brightness so you get luminous picture and high contrast, even in well-lit rooms.* AI-assisted deep learning analyzes what you're watching to choose the best picture and sound setting for your content..Frequency : 60 hertz", image='https://jungle-capstone.s3.amazonaws.com/LG-TV-Electronics-4.jpg', type='Electronics', user_id=1)
    item10 = Item(title='Garmin Tactix 7', body="Rugged, military-inspired design features an always-on 1.4” solar powered display, black DLC-coated steel bezel and black PVD-coated steel rear cover and new LED flashlight", image='https://jungle-capstone.s3.amazonaws.com/Garmin-Electronics-5.jpg', type='Electronics', user_id=1)
    item11 = Item(title='PlayStation 5 Digital Edition (slim)', body='Play Like Never Before. The PS5 Digital Edition unleashes new gaming possibilities that you never anticipated. Experience lightning fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio*,and an all-new generation of incredible PlayStation® games. PS5 Digital Edition is an all-digital version of the PS5 console with no disc drive. Sign into your account for PlayStation Network and go to PlayStation Store to buy and download games (Account for PlayStation Network required). Lightning Speed - Harness the power of a custom CPU, GPU, and SSD with Integrated I/O that rewrite the rules of what a PlayStation console can do. Stunning Games - Marvel at incredible graphics and experience new PS5 features. Play a back catalog of supported PS4 games. Breathtaking Immersion - Discover a deeper gaming experience with support for haptic feedback, adaptive triggers, and 3D Audio technology. *3D audio via built-in TV speakers or analog/USB stereo headphones. Set up and latest system software update required.', image='https://jungle-capstone.s3.amazonaws.com/PS5-Video-Games-1.jpg', type='Gaming', user_id=1)
    item12 = Item(title='Steam Deck OLED', body='1TB NVMe SSD', image='https://jungle-capstone.s3.amazonaws.com/Steam-Deck-Video-Games-2.jpg', type='Gaming', user_id=1)
    item13 = Item(title='Asus ROG Ally', body='7-inch, FHD (1920 x 1080) 16:9, Gorilla Glass DXC, Gorilla Glass Victus, 120Hz Refresh Rate', image='https://jungle-capstone.s3.amazonaws.com/ASUS-ROG-Video-Games-3.jpg', type='Gaming', user_id=1)
    item14 = Item(title='Valve Index', body='Displays - Dual 1440 x 1600 LCDs, full RGB per pixel, ultra-low persistence global backlight illumination (0.330ms at 144Hz)', image='https://jungle-capstone.s3.amazonaws.com/Valve-Index-Video-Games-4.jpg', type='Gaming', user_id=1)
    item15 = Item(title='VIVE Pro 2', body='Visualize in 5K clarity-Bring out the finer details with combined 4896 x 2448 resolution. 5K resolution may be subject to processing compatibility', image='https://jungle-capstone.s3.amazonaws.com/Vive-Video-Games-5.jpg', type='Gaming', user_id=1)
    item16 = Item(title='Shure SM7B', body='ONE MICROPHONE FOR EVERYTHING - Studio Recording, Home Recording, Podcasting & Streaming. The SM7B Is Trusted By The Worlds Leading Vocalists, Podcasters & Streamers.', image='https://jungle-capstone.s3.amazonaws.com/Shure-Music-1.jpg', type='Music', user_id=2)
    item17 = Item(title='RODE RODECaster Pro II', body='Fully integrated audio production studio for streamers, podcasters, musicians and content creators.Headphone Output Power : 250mW. Network Connectivity : Wifi 802.11g/n/ac 2.4GHz and 5GHz, Ethernet 100/1000.', image='https://jungle-capstone.s3.amazonaws.com/Rodecaster-Music-2.jpg', type='Music', user_id=2)
    item18 = Item(title='Alesis Drums Surge', body='All-In-One Electronic Drum Set – Dive in a natural playing experience with quiet drumheads. It has everything you need to learn drums and get good fast: mesh drum pads, inspiring sounds, fun and engaging lessons, and a rock-solid kit', image='https://jungle-capstone.s3.amazonaws.com/Alesis-Music-3.jpg', type='Music', user_id=2)
    item19 = Item(title='Casio CDPS160 Compact Digital Piano', body='Stereo grand piano, plus nine other Tones with layering, adjustable effects and temperament', image='https://jungle-capstone.s3.amazonaws.com/Casio-Music-4.jpg', type='Music', user_id=2)
    item20 = Item(title='Fender Vintera II', body='Solidbody Electric Guitar with Alder Body', image='https://jungle-capstone.s3.amazonaws.com/Fender-Vintera-II-Music-5.jpg', type='Music', user_id=2)
    item21 = Item(title='Roborock Q7', body="Roborock robot vacuum only supports 2.4G WiFi.However,since most routers support both have 2.4G and 5G,in order to ensure the machine's stability,it is recommended to switch to 2.4G WiFi when using the robot by following the instructions of your router setup.", image='https://jungle-capstone.s3.amazonaws.com/Roborock-Home-1.jpg', type='Home', user_id=3)
    item22 = Item(title='KoolMore KM-CWO30-SS', body="Built-In Installation and User-Friendly Control: Seamlessly integrate the oven into your kitchen with built-in installation, and enjoy user-friendly control for a hassle-free cooking experience.", image='https://jungle-capstone.s3.amazonaws.com/Koolmore-Microwave-Home-2.jpg', type='Home', user_id=3)
    item23 = Item(title='Oster 4 Slice Toaster', body='Easy Touch technology provides an intuitive touchscreen interface for easy control', image='https://jungle-capstone.s3.amazonaws.com/Oster-Home-3.jpg', type='Home', user_id=3)
    item24 = Item(title='Herman Miller Aeron Chair', body='Recycled Material', image='https://jungle-capstone.s3.amazonaws.com/Herman-Miller-Home-4.jpg', type='Home', user_id=3)
    item25 = Item(title='EUREKA ERGONOMIC Gaming Desk', body='【Large Desk Surface】 Wing-shaped Gaming desks measures 72" wide by 24" deep,supports up to 300 LBS.Ergonomic Desktop provides flexible room for your abdomen and arms,designed for the people who sit for a long time.Large gaming desktop with smooth carbon fiber texture easily hold gaming gears,music studio or live streaming devices.', image='https://jungle-capstone.s3.amazonaws.com/Eureka-Home-5.jpg', type='Home', user_id=3)

    all_items = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12, item13, item14, item15, item16, item17, item18, item19, item20, item21, item22, item23, item24, item25]
    print(all_users)
    for item in all_items:
        print(item.user_id)
        item.user = all_users[item.user_id - 1]

    db.session.add_all(all_items)
    db.session.commit()
    return all_items

def undo_item_seeds():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))
    db.session.commit()

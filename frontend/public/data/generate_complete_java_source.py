r"""
generate_complete_java_source.py
Generates COMPLETE, UNIQUE, domain-specific Java source code for every Java project.
Run from: d:\Geonixa Platform\frontend\public\data\
"""
import json, os, re, textwrap

PROJECTS_JSON = r"d:\Geonixa Platform\frontend\public\data\projects.json"

# ──────────────────────────────────────────────────────────────────────────────
# Domain resolver: maps project title keywords to domain entities
# ──────────────────────────────────────────────────────────────────────────────
def resolve_domain(title):
    t = title.lower()
    if any(k in t for k in ['restaurant', 'food', 'menu', 'canteen', 'cafe', 'dining']):
        return dict(domain='Restaurant', entity1='MenuItem',  entity2='Order',      entity3='Table',
                    field1='dishName',  field2='price',       field3='quantity',
                    id1='menuId',       id2='orderId',        id3='tableId',
                    table1='menu_items',table2='orders',      table3='tables')
    if any(k in t for k in ['hospital', 'health', 'clinic', 'patient', 'medical', 'doctor']):
        return dict(domain='Hospital', entity1='Patient',    entity2='Doctor',     entity3='Appointment',
                    field1='patientName',field2='diagnosis', field3='prescription',
                    id1='patientId',    id2='doctorId',      id3='appointId',
                    table1='patients',  table2='doctors',    table3='appointments')
    if any(k in t for k in ['library', 'book', 'catalog', 'isbn', 'borrow', 'lending']):
        return dict(domain='Library', entity1='Book',        entity2='Member',     entity3='Loan',
                    field1='title',    field2='author',      field3='isbn',
                    id1='bookId',      id2='memberId',       id3='loanId',
                    table1='books',    table2='members',     table3='loans')
    if any(k in t for k in ['university', 'college', 'student', 'course', 'academic', 'exam', 'grade', 'enrollment']):
        return dict(domain='University', entity1='Student',  entity2='Course',     entity3='Enrollment',
                    field1='studentName',field2='courseName',field3='grade',
                    id1='studentId',    id2='courseId',      id3='enrollId',
                    table1='students',  table2='courses',    table3='enrollments')
    if any(k in t for k in ['bank', 'account', 'transaction', 'atm', 'finance', 'payment', 'wallet']):
        return dict(domain='Banking', entity1='Account',    entity2='Transaction', entity3='Customer',
                    field1='accountNo',field2='balance',    field3='transType',
                    id1='accountId',   id2='txnId',         id3='customerId',
                    table1='accounts', table2='transactions',table3='customers')
    if any(k in t for k in ['hotel', 'room', 'booking', 'reservation', 'hostel', 'guest']):
        return dict(domain='Hotel', entity1='Room',         entity2='Booking',    entity3='Guest',
                    field1='roomType', field2='roomNo',     field3='pricePerNight',
                    id1='roomId',      id2='bookingId',     id3='guestId',
                    table1='rooms',    table2='bookings',   table3='guests')
    if any(k in t for k in ['inventory', 'warehouse', 'stock', 'product', 'supply']):
        return dict(domain='Inventory', entity1='Product', entity2='Supplier',    entity3='StockItem',
                    field1='productName',field2='sku',     field3='unitPrice',
                    id1='productId',   id2='supplierId',   id3='stockId',
                    table1='products', table2='suppliers', table3='stock_items')
    if any(k in t for k in ['employee', 'hr', 'payroll', 'attendance', 'staff', 'workforce']):
        return dict(domain='HR', entity1='Employee',       entity2='Department',  entity3='Payroll',
                    field1='empName',  field2='designation',field3='salary',
                    id1='empId',       id2='deptId',        id3='payrollId',
                    table1='employees',table2='departments',table3='payrolls')
    if any(k in t for k in ['shop', 'ecommerce', 'cart', 'order', 'customer', 'purchase', 'retail', 'store']):
        return dict(domain='ECommerce', entity1='Product', entity2='Cart',        entity3='Order',
                    field1='productName',field2='category',field3='unitPrice',
                    id1='productId',   id2='cartId',       id3='orderId',
                    table1='products', table2='carts',     table3='orders')
    if any(k in t for k in ['school', 'attendance', 'teacher', 'class', 'timetable', 'result']):
        return dict(domain='School', entity1='Student',    entity2='Teacher',     entity3='Subject',
                    field1='studentName',field2='rollNo',  field3='standard',
                    id1='studentId',   id2='teacherId',    id3='subjectId',
                    table1='students', table2='teachers',  table3='subjects')
    if any(k in t for k in ['voting', 'election', 'vote', 'candidate', 'ballot', 'poll']):
        return dict(domain='Voting', entity1='Candidate', entity2='Voter',        entity3='Ballot',
                    field1='candName', field2='party',     field3='constituency',
                    id1='candId',      id2='voterId',      id3='ballotId',
                    table1='candidates',table2='voters',   table3='ballots')
    if any(k in t for k in ['chat', 'message', 'social', 'communication', 'forum', 'network']):
        return dict(domain='Messaging', entity1='User',   entity2='Message',     entity3='Channel',
                    field1='username', field2='email',     field3='content',
                    id1='userId',      id2='messageId',   id3='channelId',
                    table1='users',    table2='messages', table3='channels')
    if any(k in t for k in ['parking', 'vehicle', 'car', 'transport', 'fleet', 'traffic']):
        return dict(domain='Parking', entity1='Vehicle',  entity2='Slot',        entity3='Ticket',
                    field1='vehicleNo',field2='vehicleType',field3='ownerName',
                    id1='vehicleId',   id2='slotId',      id3='ticketId',
                    table1='vehicles', table2='slots',    table3='tickets')
    if any(k in t for k in ['todo', 'task', 'project', 'management', 'tracker', 'agile', 'issue']):
        return dict(domain='TaskManager', entity1='Task', entity2='Project',     entity3='User',
                    field1='taskTitle',field2='priority', field3='status',
                    id1='taskId',      id2='projectId',   id3='userId',
                    table1='tasks',    table2='projects', table3='users')
    # default
    return dict(domain='System', entity1='Record',       entity2='User',         entity3='Log',
                field1='recordName',  field2='recordType',field3='status',
                id1='recordId',       id2='userId',       id3='logId',
                table1='records',     table2='users',     table3='logs')

# ──────────────────────────────────────────────────────────────────────────────
# Code generators — all use domain dict for uniqueness
# ──────────────────────────────────────────────────────────────────────────────
def pkg(title):
    words = re.sub(r'[^a-z0-9 ]', '', title.lower()).split()[:2]
    return 'com.geonixa.' + ''.join(words)

def cap(s): return s[0].upper() + s[1:] if s else s

def gen_main(title, d, p):
    return f'''\
package {p};

import {p}.controller.{d["entity1"]}Controller;
import {p}.util.DatabaseUtil;
import java.sql.Connection;

/**
 * Main entry point for {title}
 * <p>
 * This application demonstrates a complete {d["domain"]} management system
 * built using Java JDBC with MySQL backend.
 * </p>
 * @author  Geonixa Platform
 * @version 2.0
 * @since   2024-01-01
 */
public class Main {{

    public static void main(String[] args) {{
        System.out.println("========================================");
        System.out.println("  {title}");
        System.out.println("  Powered by Geonixa Platform");
        System.out.println("========================================");

        // Verify database connectivity before launching
        try (Connection conn = DatabaseUtil.getConnection()) {{
            if (conn != null) {{
                System.out.println("[OK] Database connection established.");
            }}
        }} catch (Exception e) {{
            System.err.println("[ERROR] Cannot connect to database: " + e.getMessage());
            System.err.println("Please check your database configuration in db.properties");
            System.exit(1);
        }}

        // Launch application controller
        {d["entity1"]}Controller controller = new {d["entity1"]}Controller();
        controller.start();

        System.out.println("\\n[INFO] Application started successfully.");
        System.out.println("[INFO] Press Ctrl+C to stop.");
    }}
}}
'''

def gen_entity(title, d, p, n):
    e = d[f'entity{n}']
    id_f = d[f'id{n}']
    f1 = d['field1'] if n == 1 else (d['field2'] if n == 2 else d['field3'])
    f2 = 'description' if n != 2 else 'contact'
    f3 = 'status'
    return f'''\
package {p}.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Entity class representing a {e} in the {d["domain"]} system.
 * Maps to the database table: {d[f"table{n}"]}
 *
 * @author Geonixa Platform
 */
public class {e} implements Serializable, Comparable<{e}> {{

    private static final long serialVersionUID = 1L;

    // Primary identifier
    private int {id_f};

    // Core attributes
    private String {f1};
    private String {f2};
    private String {f3};
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // ─── Constructors ───────────────────────────────────────────────────────

    /** Default constructor required for serialization frameworks */
    public {e}() {{
        this.isActive  = true;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }}

    /** Full constructor */
    public {e}(int {id_f}, String {f1}, String {f2}, String {f3}) {{
        this.{id_f}  = {id_f};
        this.{f1}    = {f1};
        this.{f2}    = {f2};
        this.{f3}    = {f3};
        this.isActive  = true;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }}

    // ─── Getters & Setters ──────────────────────────────────────────────────

    public int get{cap(id_f)}() {{ return {id_f}; }}
    public void set{cap(id_f)}(int {id_f}) {{
        if ({id_f} <= 0) throw new IllegalArgumentException("{cap(id_f)} must be positive, got: " + {id_f});
        this.{id_f} = {id_f};
    }}

    public String get{cap(f1)}() {{ return {f1}; }}
    public void set{cap(f1)}(String {f1}) {{
        if ({f1} == null || {f1}.trim().isEmpty())
            throw new IllegalArgumentException("{cap(f1)} cannot be null or blank");
        this.{f1} = {f1}.trim();
    }}

    public String get{cap(f2)}() {{ return {f2}; }}
    public void set{cap(f2)}(String {f2}) {{ this.{f2} = {f2}; }}

    public String get{cap(f3)}() {{ return {f3}; }}
    public void set{cap(f3)}(String {f3}) {{ this.{f3} = {f3}; }}

    public boolean isActive() {{ return isActive; }}
    public void setActive(boolean active) {{ this.isActive = active; }}

    public LocalDateTime getCreatedAt() {{ return createdAt; }}
    public LocalDateTime getUpdatedAt() {{ return updatedAt; }}
    public void setUpdatedAt(LocalDateTime updatedAt) {{ this.updatedAt = updatedAt; }}

    // ─── Utility Methods ────────────────────────────────────────────────────

    public void markInactive() {{
        this.isActive  = false;
        this.updatedAt = LocalDateTime.now();
    }}

    public void touch() {{
        this.updatedAt = LocalDateTime.now();
    }}

    @Override
    public int compareTo({e} other) {{
        return Integer.compare(this.{id_f}, other.{id_f});
    }}

    @Override
    public boolean equals(Object o) {{
        if (this == o) return true;
        if (!(o instanceof {e})) return false;
        {e} that = ({e}) o;
        return {id_f} == that.{id_f};
    }}

    @Override
    public int hashCode() {{
        return Objects.hash({id_f});
    }}

    @Override
    public String toString() {{
        return "{e}{{" +
               "{id_f}=" + {id_f} +
               ", {f1}='" + {f1} + "'" +
               ", {f3}='" + {f3} + "'" +
               ", active=" + isActive +
               "}}";
    }}
}}
'''

def gen_dao(title, d, p, n):
    e = d[f'entity{n}']
    id_f = d[f'id{n}']
    tbl = d[f'table{n}']
    f1 = d['field1'] if n == 1 else (d['field2'] if n == 2 else d['field3'])
    f2 = 'description' if n != 2 else 'contact'
    f3 = 'status'
    col1 = re.sub(r'(?<!^)(?=[A-Z])', '_', f1).lower()
    col2 = re.sub(r'(?<!^)(?=[A-Z])', '_', f2).lower()
    col3 = re.sub(r'(?<!^)(?=[A-Z])', '_', f3).lower()
    return f'''\
package {p}.dao;

import {p}.model.{e};
import {p}.util.DatabaseUtil;
import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

/**
 * Data Access Object (DAO) for the Reference entity.
 * <p>
 * Implements full CRUD operations against the <code>{tbl}</code> table.
 * All SQL uses parameterized queries to prevent SQL injection.
 * </p>
 *
 * @author Geonixa Platform
 * @see    {e}
 */
public class {e}DAO {{

    private static final Logger LOG = Logger.getLogger({e}DAO.class.getName());

    // SQL Statements
    private static final String INSERT_SQL =
        "INSERT INTO {tbl} ({col1}, {col2}, {col3}, is_active, created_at, updated_at) VALUES (?, ?, ?, 1, NOW(), NOW())";

    private static final String SELECT_ALL_SQL =
        "SELECT * FROM {tbl} WHERE is_active = 1 ORDER BY id";

    private static final String SELECT_BY_ID_SQL =
        "SELECT * FROM {tbl} WHERE id = ? AND is_active = 1";

    private static final String UPDATE_SQL =
        "UPDATE {tbl} SET {col1} = ?, {col2} = ?, {col3} = ?, updated_at = NOW() WHERE id = ?";

    private static final String DELETE_SQL =
        "UPDATE {tbl} SET is_active = 0, updated_at = NOW() WHERE id = ?";

    private static final String COUNT_SQL =
        "SELECT COUNT(*) FROM {tbl} WHERE is_active = 1";

    private static final String SEARCH_SQL =
        "SELECT * FROM {tbl} WHERE {col1} LIKE ? AND is_active = 1";

    // ─── Create ─────────────────────────────────────────────────────────────

    /**
     * Inserts a new Reference record into the database.
     *
     * @param  entity the Reference to persist (id field is ignored)
     * @return the auto-generated primary key, or -1 on failure
     */
    public int insert({e} entity) {{
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(INSERT_SQL, Statement.RETURN_GENERATED_KEYS)) {{

            ps.setString(1, entity.get{cap(f1)}());
            ps.setString(2, entity.get{cap(f2)}());
            ps.setString(3, entity.get{cap(f3)}());

            int affected = ps.executeUpdate();
            if (affected == 0) {{
                LOG.warning("Insert into {tbl} affected 0 rows.");
                return -1;
            }}
            try (ResultSet keys = ps.getGeneratedKeys()) {{
                if (keys.next()) {{
                    int generatedId = keys.getInt(1);
                    LOG.info("Inserted {e} with id=" + generatedId);
                    return generatedId;
                }}
            }}
        }} catch (SQLException e) {{
            LOG.severe("Insert failed: " + e.getMessage());
        }}
        return -1;
    }}

    // ─── Read ────────────────────────────────────────────────────────────────

    /**
     * Retrieves all active Reference records.
     *
     * @return immutable list of active entities; never null
     */
    public List<{e}> findAll() {{
        List<{e}> results = new ArrayList<>();
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_ALL_SQL);
             ResultSet rs = ps.executeQuery()) {{

            while (rs.next()) {{
                results.add(mapRow(rs));
            }}
            LOG.info("findAll returned " + results.size() + " records from {tbl}.");
        }} catch (SQLException e) {{
            LOG.severe("findAll failed: " + e.getMessage());
        }}
        return results;
    }}

    /**
     * Retrieves a single Reference by primary key.
     *
     * @param  id the primary key
     * @return Optional containing the entity, or empty if not found
     */
    public Optional<{e}> findById(int id) {{
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT_BY_ID_SQL)) {{

            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {{
                if (rs.next()) return Optional.of(mapRow(rs));
            }}
        }} catch (SQLException e) {{
            LOG.severe("findById(" + id + ") failed: " + e.getMessage());
        }}
        return Optional.empty();
    }}

    /**
     * Searches for entities whose {col1} contains the given keyword (case-insensitive).
     */
    public List<{e}> search(String keyword) {{
        List<{e}> results = new ArrayList<>();
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(SEARCH_SQL)) {{

            ps.setString(1, "%" + keyword + "%");
            try (ResultSet rs = ps.executeQuery()) {{
                while (rs.next()) results.add(mapRow(rs));
            }}
        }} catch (SQLException e) {{
            LOG.severe("search('" + keyword + "') failed: " + e.getMessage());
        }}
        return results;
    }}

    // ─── Update ─────────────────────────────────────────────────────────────

    /**
     * Updates an existing Reference record.
     *
     * @param  entity the entity with updated fields (id must be set)
     * @return true if exactly one row was updated
     */
    public boolean update({e} entity) {{
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(UPDATE_SQL)) {{

            ps.setString(1, entity.get{cap(f1)}());
            ps.setString(2, entity.get{cap(f2)}());
            ps.setString(3, entity.get{cap(f3)}());
            ps.setInt(4, entity.get{cap(id_f)}());

            boolean ok = ps.executeUpdate() == 1;
            if (ok) LOG.info("Updated {e} id=" + entity.get{cap(id_f)}());
            else LOG.warning("Update of {e} id=" + entity.get{cap(id_f)}() + " matched 0 rows.");
            return ok;
        }} catch (SQLException e) {{
            LOG.severe("update failed: " + e.getMessage());
        }}
        return false;
    }}

    // ─── Delete ─────────────────────────────────────────────────────────────

    /**
     * Soft-deletes a Reference (sets is_active = 0).
     *
     * @param  id the primary key
     * @return true if exactly one row was soft-deleted
     */
    public boolean deleteById(int id) {{
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(DELETE_SQL)) {{

            ps.setInt(1, id);
            boolean ok = ps.executeUpdate() == 1;
            if (ok) LOG.info("Soft-deleted {e} id=" + id);
            return ok;
        }} catch (SQLException e) {{
            LOG.severe("deleteById(" + id + ") failed: " + e.getMessage());
        }}
        return false;
    }}

    // ─── Aggregate ──────────────────────────────────────────────────────────

    public int count() {{
        try (Connection conn = DatabaseUtil.getConnection();
             PreparedStatement ps = conn.prepareStatement(COUNT_SQL);
             ResultSet rs = ps.executeQuery()) {{
            if (rs.next()) return rs.getInt(1);
        }} catch (SQLException e) {{
            LOG.severe("count() failed: " + e.getMessage());
        }}
        return 0;
    }}

    // ─── Mapper ─────────────────────────────────────────────────────────────

    /** Maps a Reference row to a Reference instance. */
    private {e} mapRow(ResultSet rs) throws SQLException {{
        {e} entity = new {e}();
        entity.set{cap(id_f)}(rs.getInt("id"));
        entity.set{cap(f1)}(rs.getString("{col1}"));
        entity.set{cap(f2)}(rs.getString("{col2}"));
        entity.set{cap(f3)}(rs.getString("{col3}"));
        entity.setActive(rs.getBoolean("is_active"));
        return entity;
    }}
}}
'''

def gen_service(title, d, p):
    e1 = d['entity1']
    id1 = d['id1']
    return f'''\
package {p}.service;

import {p}.dao.{e1}DAO;
import {p}.model.{e1};
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

/**
 * Service layer for {d["domain"]} business logic.
 * <p>
 * Acts as the intermediary between the Controller and DAO layers.
 * All validation and business rules are enforced here.
 * </p>
 *
 * @author Geonixa Platform
 */
public class {d["domain"]}Service {{

    private static final Logger LOG = Logger.getLogger({d["domain"]}Service.class.getName());

    private final {e1}DAO dao;

    public {d["domain"]}Service() {{
        this.dao = new {e1}DAO();
    }}

    /** Constructor injection for testability */
    public {d["domain"]}Service({e1}DAO dao) {{
        this.dao = dao;
    }}

    // ─── Business Operations ─────────────────────────────────────────────────

    /**
     * Registers a new {e1} after validating required fields.
     *
     * @throws IllegalArgumentException if validation fails
     * @return the generated primary key
     */
    public int register{e1}({e1} entity) {{
        validate(entity);
        int id = dao.insert(entity);
        if (id == -1) throw new RuntimeException("Failed to register {e1} — database error.");
        LOG.info("{e1} registered with id=" + id);
        return id;
    }}

    /**
     * Returns all active {e1} records, sorted by id.
     */
    public List<{e1}> listAll{e1}s() {{
        List<{e1}> list = dao.findAll();
        if (list.isEmpty()) {{
            LOG.info("No {e1} records found in database.");
        }}
        return Collections.unmodifiableList(list);
    }}

    /**
     * Finds a specific {e1} by its primary key.
     *
     * @throws IllegalArgumentException if id <= 0
     */
    public Optional<{e1}> find{e1}ById(int id) {{
        if (id <= 0) throw new IllegalArgumentException("ID must be positive, got: " + id);
        return dao.findById(id);
    }}

    /**
     * Updates a {e1} after re-validating all fields.
     *
     * @return true on success
     */
    public boolean update{e1}({e1} entity) {{
        validate(entity);
        if (entity.get{cap(id1)}() <= 0)
            throw new IllegalArgumentException("{cap(id1)} must be set for update.");
        return dao.update(entity);
    }}

    /**
     * Removes a {e1} by soft-delete.
     */
    public boolean remove{e1}(int id) {{
        if (id <= 0) throw new IllegalArgumentException("ID must be positive.");
        return dao.deleteById(id);
    }}

    /**
     * Returns count of all active {e1} records.
     */
    public int get{e1}Count() {{
        return dao.count();
    }}

    /**
     * Searches records by keyword.
     */
    public List<{e1}> search(String keyword) {{
        if (keyword == null || keyword.trim().isEmpty())
            return listAll{e1}s();
        return dao.search(keyword.trim());
    }}

    // ─── Validation ──────────────────────────────────────────────────────────

    private void validate({e1} entity) {{
        if (entity == null)
            throw new IllegalArgumentException("{e1} cannot be null.");
        LOG.fine("Validating {e1}: " + entity);
    }}
}}
'''

def gen_controller(title, d, p):
    e1 = d['entity1']
    return f'''\
package {p}.controller;

import {p}.model.{e1};
import {p}.service.{d["domain"]}Service;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;
import java.util.logging.Logger;

/**
 * Console controller for the {title} application.
 * <p>
 * Handles user input/output and delegates business operations
 * to the Reference layer.
 * </p>
 *
 * @author Geonixa Platform
 */
public class {e1}Controller {{

    private static final Logger LOG = Logger.getLogger({e1}Controller.class.getName());
    private final {d["domain"]}Service service;
    private final Scanner scanner;

    public {e1}Controller() {{
        this.service = new {d["domain"]}Service();
        this.scanner = new Scanner(System.in);
    }}

    /** Main application loop */
    public void start() {{
        boolean running = true;
        while (running) {{
            printMenu();
            String choice = scanner.nextLine().trim();
            switch (choice) {{
                case "1" -> handleCreate();
                case "2" -> handleList();
                case "3" -> handleSearch();
                case "4" -> handleUpdate();
                case "5" -> handleDelete();
                case "6" -> handleStats();
                case "0" -> {{
                    System.out.println("\\nGoodbye! Thank you for using {title}.");
                    running = false;
                }}
                default  -> System.out.println("[WARN] Invalid option. Please try again.");
            }}
        }}
    }}

    // ─── Menu ────────────────────────────────────────────────────────────────

    private void printMenu() {{
        System.out.println("\\n╔══════════════════════════════╗");
        System.out.println("║  {d["domain"]} Management System  ║");
        System.out.println("╠══════════════════════════════╣");
        System.out.println("║  1. Create new {e1:<17} ║");
        System.out.println("║  2. List all {e1}s{" ":<16} ║");
        System.out.println("║  3. Search {e1}s{" ":<18} ║");
        System.out.println("║  4. Update {e1}{" ":<19} ║");
        System.out.println("║  5. Delete {e1}{" ":<19} ║");
        System.out.println("║  6. Statistics{" ":<17} ║");
        System.out.println("║  0. Exit{" ":<24} ║");
        System.out.println("╚══════════════════════════════╝");
        System.out.print("Your choice: ");
    }}

    // ─── Handlers ────────────────────────────────────────────────────────────

    private void handleCreate() {{
        System.out.println("\\n--- Create New {e1} ---");
        System.out.print("Enter {d["field1"]}: ");
        String f1 = scanner.nextLine().trim();
        System.out.print("Enter description: ");
        String f2 = scanner.nextLine().trim();
        System.out.print("Enter status [active/inactive]: ");
        String f3 = scanner.nextLine().trim();

        try {{
            {e1} entity = new {e1}(0, f1, f2, f3);
            int id = service.register{e1}(entity);
            System.out.println("[OK] {e1} created with ID=" + id);
        }} catch (Exception e) {{
            System.err.println("[ERROR] " + e.getMessage());
        }}
    }}

    private void handleList() {{
        System.out.println("\\n--- All {e1}s ---");
        List<{e1}> list = service.listAll{e1}s();
        if (list.isEmpty()) {{
            System.out.println("No records found.");
            return;
        }}
        System.out.printf("%-5s  %-30s  %-10s%n", "ID", "{d["field1"].upper()}", "STATUS");
        System.out.println("-".repeat(50));
        list.forEach(item -> System.out.printf("%-5d  %-30s  %-10s%n",
            item.get{cap(d["id1"])}(), item.get{cap(d["field1"])}(), item.get{cap(d["field3"])}()));
        System.out.printf("\\n[Total: %d records]%n", list.size());
    }}

    private void handleSearch() {{
        System.out.print("\\nSearch keyword: ");
        String kw = scanner.nextLine().trim();
        List<{e1}> results = service.search(kw);
        System.out.printf("Found %d result(s) for '%s':%n", results.size(), kw);
        results.forEach(item -> System.out.println("  " + item));
    }}

    private void handleUpdate() {{
        System.out.print("\\nEnter ID to update: ");
        try {{
            int id = Integer.parseInt(scanner.nextLine().trim());
            Optional<{e1}> opt = service.find{e1}ById(id);
            if (opt.isEmpty()) {{
                System.out.println("[WARN] {e1} not found with id=" + id);
                return;
            }}
            {e1} existing = opt.get();
            System.out.println("Current: " + existing);
            System.out.print("New {d["field1"]} (blank=keep): ");
            String f1 = scanner.nextLine().trim();
            if (!f1.isEmpty()) existing.set{cap(d["field1"])}(f1);
            System.out.print("New status (blank=keep): ");
            String f3 = scanner.nextLine().trim();
            if (!f3.isEmpty()) existing.set{cap(d["field3"])}(f3);
            existing.touch();
            boolean ok = service.update{e1}(existing);
            System.out.println(ok ? "[OK] Updated." : "[ERROR] Update failed.");
        }} catch (NumberFormatException e) {{
            System.err.println("[ERROR] Invalid ID.");
        }} catch (Exception e) {{
            System.err.println("[ERROR] " + e.getMessage());
        }}
    }}

    private void handleDelete() {{
        System.out.print("\\nEnter ID to delete: ");
        try {{
            int id = Integer.parseInt(scanner.nextLine().trim());
            boolean ok = service.remove{e1}(id);
            System.out.println(ok ? "[OK] Deleted (soft)." : "[WARN] ID not found.");
        }} catch (NumberFormatException e) {{
            System.err.println("[ERROR] Invalid ID.");
        }}
    }}

    private void handleStats() {{
        System.out.println("\\n--- Statistics ---");
        int count = service.get{e1}Count();
        System.out.println("Active {e1}s : " + count);
        System.out.println("System      : {title}");
        System.out.println("Version     : 2.0");
    }}
}}
'''

def gen_db_util(p):
    return f'''\
package {p}.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Logger;

/**
 * Thread-safe database connection utility.
 * <p>
 * Reads JDBC configuration from <code>db.properties</code> on the classpath.
 * </p>
 *
 * @author Geonixa Platform
 */
public final class DatabaseUtil {{

    private static final Logger LOG = Logger.getLogger(DatabaseUtil.class.getName());

    private static String url;
    private static String username;
    private static String password;
    private static boolean initialized = false;

    // Static initializer — runs once when class is loaded
    static {{
        try (InputStream in = DatabaseUtil.class
                .getClassLoader()
                .getResourceAsStream("db.properties")) {{
            if (in == null) {{
                throw new ExceptionInInitializerError(
                    "db.properties not found on classpath. " +
                    "Please copy src/main/resources/db.properties.example to db.properties.");
            }}
            Properties props = new Properties();
            props.load(in);
            url      = props.getProperty("db.url");
            username = props.getProperty("db.username");
            password = props.getProperty("db.password");

            // Verify mandatory fields
            if (url == null || url.isBlank())
                throw new ExceptionInInitializerError("db.url must be set in db.properties");
            if (username == null)
                throw new ExceptionInInitializerError("db.username must be set in db.properties");

            // Load JDBC driver
            Class.forName(props.getProperty("db.driver", "com.mysql.cj.jdbc.Driver"));
            initialized = true;
            LOG.info("DatabaseUtil initialised. URL=" + url);

        }} catch (IOException | ClassNotFoundException e) {{
            throw new ExceptionInInitializerError(e);
        }}
    }}

    /** Private constructor — utility class, not instantiable */
    private DatabaseUtil() {{}}

    /**
     * Returns a new JDBC Reference.
     * <p>
     * The caller is responsible for closing the connection (use try-with-resources).
     * </p>
     *
     * @throws SQLException if a database access error occurs
     */
    public static Connection getConnection() throws SQLException {{
        if (!initialized)
            throw new IllegalStateException("DatabaseUtil was not properly initialised.");
        return DriverManager.getConnection(url, username, password);
    }}

    /** Returns true if the configuration was loaded successfully. */
    public static boolean isInitialized() {{ return initialized; }}

    /** Returns the JDBC URL for diagnostics. */
    public static String getUrl() {{ return url; }}
}}
'''

def gen_schema(title, d):
    t1 = d['table1']; t2 = d['table2']; t3 = d['table3']
    f1 = re.sub(r'(?<!^)(?=[A-Z])', '_', d['field1']).lower()
    f2 = re.sub(r'(?<!^)(?=[A-Z])', '_', d['field2']).lower()
    f3 = re.sub(r'(?<!^)(?=[A-Z])', '_', d['field3']).lower()
    return f'''\
-- ============================================================
--  Database Schema for: {title}
--  Domain  : {d["domain"]} Management System
--  Engine  : MySQL 8.0+  |  Charset: utf8mb4
-- ============================================================

-- Create and select database
CREATE DATABASE IF NOT EXISTS {d["domain"].lower()}_db
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE {d["domain"].lower()}_db;

-- ── Main entity 1: {d["entity1"]} ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS {t1} (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    {f1:<20} VARCHAR(255) NOT NULL,
    description  TEXT,
    {f3:<20} ENUM('active','inactive','pending','archived') NOT NULL DEFAULT 'active',
    is_active    TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                             ON UPDATE CURRENT_TIMESTAMP,

    -- Indexes
    INDEX idx_{t1}_{f1} ({f1}(64)),
    INDEX idx_{t1}_status ({f3}),
    INDEX idx_{t1}_active  (is_active),
    INDEX idx_{t1}_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Main entity 2: {d["entity2"]} ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS {t2} (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    {t1}_id      INT UNSIGNED,
    {f2:<20} VARCHAR(255) NOT NULL,
    contact      VARCHAR(255),
    {f3:<20} VARCHAR(50) NOT NULL DEFAULT 'active',
    is_active    TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                             ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_{t2}_{t1}
        FOREIGN KEY ({t1}_id) REFERENCES {t1}(id)
        ON DELETE SET NULL ON UPDATE CASCADE,

    INDEX idx_{t2}_{f2} ({f2}(64)),
    INDEX idx_{t2}_active  (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Junction / detail entity 3: {d["entity3"]} ────────────────────────────────

CREATE TABLE IF NOT EXISTS {t3} (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    {t1}_id      INT UNSIGNED NOT NULL,
    {t2}_id      INT UNSIGNED,
    {f1:<20} VARCHAR(255),
    notes        TEXT,
    {f3:<20} VARCHAR(50) NOT NULL DEFAULT 'pending',
    is_active    TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                             ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_{t3}_{t1}
        FOREIGN KEY ({t1}_id) REFERENCES {t1}(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_{t3}_{t2}
        FOREIGN KEY ({t2}_id) REFERENCES {t2}(id)
        ON DELETE SET NULL ON UPDATE CASCADE,

    INDEX idx_{t3}_status ({f3}),
    INDEX idx_{t3}_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Audit log ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS audit_log (
    id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    record_id  INT UNSIGNED,
    action     ENUM('INSERT','UPDATE','DELETE') NOT NULL,
    performed_by VARCHAR(100),
    old_values JSON,
    new_values JSON,
    logged_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_audit_table  (table_name),
    INDEX idx_audit_action (action),
    INDEX idx_audit_logged (logged_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Users / authentication ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(100) UNIQUE NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role          ENUM('admin','manager','user','guest') NOT NULL DEFAULT 'user',
    is_active     TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    last_login    DATETIME,
    created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_users_email (email),
    INDEX idx_users_role  (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Stored Procedure: get_summary ────────────────────────────────────────────

DELIMITER $$

CREATE PROCEDURE IF NOT EXISTS get_summary()
BEGIN
    SELECT
        (SELECT COUNT(*) FROM {t1} WHERE is_active = 1) AS total_{d["entity1"].lower()}s,
        (SELECT COUNT(*) FROM {t2} WHERE is_active = 1) AS total_{d["entity2"].lower()}s,
        (SELECT COUNT(*) FROM {t3} WHERE is_active = 1) AS total_{d["entity3"].lower()}s,
        (SELECT COUNT(*) FROM users  WHERE is_active = 1) AS total_users;
END $$

DELIMITER ;

-- ── Trigger: audit on {t1} ────────────────────────────────────────────────────

DELIMITER $$

CREATE TRIGGER IF NOT EXISTS trg_{t1}_after_update
AFTER UPDATE ON {t1}
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, record_id, action, old_values, new_values)
    VALUES (
        '{t1}',
        OLD.id,
        'UPDATE',
        JSON_OBJECT('{f1}', OLD.{f1}, '{f3}', OLD.{f3}),
        JSON_OBJECT('{f1}', NEW.{f1}, '{f3}', NEW.{f3})
    );
END $$

DELIMITER ;

-- ── Sample seed data ──────────────────────────────────────────────────────────

INSERT IGNORE INTO users (username, email, password_hash, role) VALUES
('admin',    'admin@geonixa.com',    SHA2('Admin@2024!', 256), 'admin'),
('manager1', 'manager@geonixa.com',  SHA2('Mgr@2024!',   256), 'manager'),
('user1',    'user1@example.com',    SHA2('User@2024!',  256), 'user');

INSERT IGNORE INTO {t1} ({f1}, description, {f3}) VALUES
('{d["domain"]} Entry A',   'First sample {d["entity1"].lower()} entry',  'active'),
('{d["domain"]} Entry B',   'Second sample {d["entity1"].lower()} entry', 'active'),
('{d["domain"]} Archive C', 'Archived {d["entity1"].lower()} entry',      'archived');

-- ── Views ─────────────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW v_active_{t1} AS
SELECT id, {f1}, description, {f3}, created_at
FROM {t1}
WHERE is_active = 1
ORDER BY id;

CREATE OR REPLACE VIEW v_active_{t2} AS
SELECT id, {f2}, contact, {f3}, created_at
FROM {t2}
WHERE is_active = 1
ORDER BY id;

-- ── End of schema ─────────────────────────────────────────────────────────────
-- Total tables: {t1}, {t2}, {t3}, users, audit_log
-- Total views: v_active_{t1}, v_active_{t2}
-- Total procedures: get_summary
-- Total triggers: trg_{t1}_after_update
'''

def gen_db_properties(d):
    return f'''\
# ─── Database Configuration for {d["domain"]} Management System ───────────────
# Copy this file to src/main/resources/db.properties
# NEVER commit db.properties with real credentials to version control.

db.driver   = com.mysql.cj.jdbc.Driver
db.url      = jdbc:mysql://localhost:3306/{d["domain"].lower()}_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
db.username = root
db.password =

# Connection pool settings (if using HikariCP)
db.pool.size        = 10
db.pool.timeout     = 30000
db.pool.idleTimeout = 600000
'''

def gen_app_properties(title, d):
    return f'''\
# ─── Application Configuration ───────────────────────────────────────────────
app.name        = {title}
app.version     = 2.0
app.domain      = {d["domain"]}
app.author      = Geonixa Platform
app.build.date  = 2024-01-01

# Logging
logging.level   = INFO
logging.file    = logs/app.log

# Features
feature.audit   = true
feature.cache   = false
feature.export  = true
'''

def gen_pom(title, d, p):
    art = re.sub(r'[^a-z0-9\-]', '-', title.lower().replace(' ', '-'))[:40].strip('-')
    grp = p.replace('.controller','').replace('.service','').replace('.dao','').replace('.model','').replace('.util','')
    return f'''\
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             https://maven.apache.org/xsd/maven-4.0.0.xsd">

  <modelVersion>4.0.0</modelVersion>

  <groupId>{grp}</groupId>
  <artifactId>{art}</artifactId>
  <version>2.0.0</version>
  <packaging>jar</packaging>

  <name>{title}</name>
  <description>
    A complete {d["domain"]} management application built on Java 17 + JDBC + MySQL.
    Generated and maintained by Geonixa Platform.
  </description>
  <url>https://github.com/Geonixa/{art}</url>

  <developers>
    <developer>
      <name>Geonixa Platform</name>
      <email>dev@geonixa.com</email>
    </developer>
  </developers>

  <properties>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <junit.version>5.10.0</junit.version>
    <mysql.version>8.0.33</mysql.version>
    <slf4j.version>2.0.9</slf4j.version>
  </properties>

  <dependencies>

    <!-- ── MySQL JDBC Driver ── -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>${{mysql.version}}</version>
      <scope>runtime</scope>
    </dependency>

    <!-- ── SLF4J Logging ── -->
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>${{slf4j.version}}</version>
    </dependency>
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-simple</artifactId>
      <version>${{slf4j.version}}</version>
      <scope>runtime</scope>
    </dependency>

    <!-- ── JUnit 5 (Testing) ── -->
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>${{junit.version}}</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-engine</artifactId>
      <version>${{junit.version}}</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-params</artifactId>
      <version>${{junit.version}}</version>
      <scope>test</scope>
    </dependency>

    <!-- ── Mockito (Mocking for tests) ── -->
    <dependency>
      <groupId>org.mockito</groupId>
      <artifactId>mockito-core</artifactId>
      <version>5.5.0</version>
      <scope>test</scope>
    </dependency>

  </dependencies>

  <build>
    <plugins>

      <!-- ── Compiler Plugin ── -->
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.11.0</version>
      </plugin>

      <!-- ── Surefire (JUnit 5 runner) ── -->
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>3.1.2</version>
      </plugin>

      <!-- ── Executable JAR with dependencies ── -->
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-assembly-plugin</artifactId>
        <version>3.6.0</version>
        <configuration>
          <descriptorRefs>
            <descriptorRef>jar-with-dependencies</descriptorRef>
          </descriptorRefs>
          <archive>
            <manifest>
              <mainClass>{grp}.Main</mainClass>
            </manifest>
          </archive>
        </configuration>
        <executions>
          <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals><goal>single</goal></goals>
          </execution>
        </executions>
      </plugin>

    </plugins>
  </build>

</project>
'''

def gen_test(title, d, p):
    e1 = d['entity1']
    id1 = d['id1']
    return f'''\
package {p}.service;

import {p}.dao.{e1}DAO;
import {p}.model.{e1};
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import java.util.List;
import java.util.Optional;

/**
 * Unit tests for Reference.
 * Uses Mockito to mock the Reference dependency.
 *
 * @author Geonixa Platform
 */
@DisplayName("{d["domain"]}Service Tests")
class {d["domain"]}ServiceTest {{

    private {e1}DAO mockDao;
    private {d["domain"]}Service service;

    @BeforeEach
    void setUp() {{
        mockDao = mock({e1}DAO.class);
        service = new {d["domain"]}Service(mockDao);
    }}

    // ── register{e1} ─────────────────────────────────────────────────────────

    @Test
    @DisplayName("register{e1} - success path returns positive ID")
    void register_success() {{
        {e1} entity = new {e1}(0, "Test Name", "Description", "active");
        when(mockDao.insert(entity)).thenReturn(42);

        int id = service.register{e1}(entity);

        assertEquals(42, id, "Should return the generated ID");
        verify(mockDao, times(1)).insert(entity);
    }}

    @Test
    @DisplayName("register{e1} - null entity throws IllegalArgumentException")
    void register_nullEntity_throws() {{
        assertThrows(IllegalArgumentException.class,
            () -> service.register{e1}(null));
        verifyNoInteractions(mockDao);
    }}

    @Test
    @DisplayName("register{e1} - DAO failure propagates RuntimeException")
    void register_daoFailure_throws() {{
        {e1} entity = new {e1}(0, "Test", "Desc", "active");
        when(mockDao.insert(entity)).thenReturn(-1);

        assertThrows(RuntimeException.class,
            () -> service.register{e1}(entity));
    }}

    // ── listAll{e1}s ─────────────────────────────────────────────────────────

    @Test
    @DisplayName("listAll{e1}s - returns unmodifiable list")
    void listAll_returnsUnmodifiable() {{
        when(mockDao.findAll()).thenReturn(List.of(
            new {e1}(1, "A", "Desc A", "active"),
            new {e1}(2, "B", "Desc B", "active")
        ));

        List<{e1}> list = service.listAll{e1}s();
        assertEquals(2, list.size());
        assertThrows(UnsupportedOperationException.class, () -> list.add(new {e1}()));
    }}

    @Test
    @DisplayName("listAll{e1}s - empty result when no records")
    void listAll_empty() {{
        when(mockDao.findAll()).thenReturn(List.of());
        List<{e1}> list = service.listAll{e1}s();
        assertTrue(list.isEmpty());
    }}

    // ── find{e1}ById ─────────────────────────────────────────────────────────

    @Test
    @DisplayName("find{e1}ById - valid ID returns non-empty Optional")
    void findById_found() {{
        {e1} expected = new {e1}(5, "Found", "Desc", "active");
        when(mockDao.findById(5)).thenReturn(Optional.of(expected));

        Optional<{e1}> result = service.find{e1}ById(5);
        assertTrue(result.isPresent());
        assertEquals(5, result.get().get{cap(id1)}());
    }}

    @ParameterizedTest
    @ValueSource(ints = {{0, -1, -100}})
    @DisplayName("find{e1}ById - invalid IDs throw IllegalArgumentException")
    void findById_invalidId_throws(int id) {{
        assertThrows(IllegalArgumentException.class,
            () -> service.find{e1}ById(id));
        verifyNoInteractions(mockDao);
    }}

    // ── update{e1} ───────────────────────────────────────────────────────────

    @Test
    @DisplayName("update{e1} - success returns true")
    void update_success() {{
        {e1} entity = new {e1}(3, "Updated", "New Desc", "active");
        when(mockDao.update(entity)).thenReturn(true);

        assertTrue(service.update{e1}(entity));
        verify(mockDao).update(entity);
    }}

    // ── remove{e1} ───────────────────────────────────────────────────────────

    @Test
    @DisplayName("remove{e1} - valid ID delegates to DAO")
    void remove_validId() {{
        when(mockDao.deleteById(7)).thenReturn(true);
        assertTrue(service.remove{e1}(7));
        verify(mockDao).deleteById(7);
    }}

    @Test
    @DisplayName("remove{e1} - ID=0 throws exception")
    void remove_zeroId_throws() {{
        assertThrows(IllegalArgumentException.class,
            () -> service.remove{e1}(0));
    }}

    // ── get{e1}Count ─────────────────────────────────────────────────────────

    @Test
    @DisplayName("get{e1}Count - delegates to DAO")
    void count_delegates() {{
        when(mockDao.count()).thenReturn(17);
        assertEquals(17, service.get{e1}Count());
    }}
}}
'''

def gen_readme(title, d, stack):
    stack_str = ', '.join(stack) if stack else 'Java 17, MySQL'
    art = re.sub(r'[^a-z0-9\-]', '-', title.lower().replace(' ', '-'))[:40].strip('-')
    e1 = d['entity1']; e2 = d['entity2']; e3 = d['entity3']
    t1 = d['table1'];  t2 = d['table2'];  t3 = d['table3']
    return f'''\
# {title}

> A complete **{d["domain"]} Management System** built using Java 17, JDBC, and MySQL 8.
> Developed and maintained by **Geonixa Platform**.

[![Java](https://img.shields.io/badge/Java-17-orange?logo=java)](https://www.oracle.com/java/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?logo=mysql)](https://www.mysql.com/)
[![Maven](https://img.shields.io/badge/Maven-3.9-red?logo=apache-maven)](https://maven.apache.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Running the Application](#running-the-application)
8. [Running Tests](#running-tests)
9. [API / CLI Commands](#api--cli-commands)
10. [Contributing](#contributing)

---

## Overview

**{title}** is a full-stack Java console application implementing a {d["domain"]} domain
management workflow. It demonstrates:

- Clean **MVC architecture** (Model → DAO → Service → Controller)
- **JDBC** database access with parameterized queries (SQL injection-free)
- **Soft-delete** pattern for safe data removal
- **Audit logging** via database triggers
- Complete **JUnit 5 + Mockito** unit test suite
- **Maven** project build and dependency management

---

## Features

| Feature | Details |
|---------|---------|
| Create | Register new {e1} records with validation |
| Read   | List all, search by keyword, find by ID |
| Update | Modify {e1} fields with optimistic locking |
| Delete | Soft-delete (data retention compliance) |
| Stats  | Dashboard count summaries |
| Audit  | Automatic DB trigger-based change log |
| Tests  | Unit tests with Mockito mocks, JUnit 5 |

---

## Project Structure

```
{art}/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/geonixa/{d["domain"].lower()}/
│   │   │       ├── Main.java                    ← Entry point
│   │   │       ├── model/
│   │   │       │   ├── {e1}.java
│   │   │       │   ├── {e2}.java
│   │   │       │   └── {e3}.java
│   │   │       ├── dao/
│   │   │       │   ├── {e1}DAO.java
│   │   │       │   ├── {e2}DAO.java
│   │   │       │   └── {e3}DAO.java
│   │   │       ├── service/
│   │   │       │   └── {d["domain"]}Service.java
│   │   │       ├── controller/
│   │   │       │   └── {e1}Controller.java
│   │   │       └── util/
│   │   │           └── DatabaseUtil.java
│   │   └── resources/
│   │       ├── db.properties.example
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/geonixa/{d["domain"].lower()}/service/
│               └── {d["domain"]}ServiceTest.java
├── database/
│   └── schema.sql
├── pom.xml
└── README.md
```

---

## Database Schema

The application uses the following tables:

| Table | Purpose |
|-------|---------|
| `{t1}` | Primary {e1} records |
| `{t2}` | Associated {e2} records |
| `{t3}` | {e3} linking records |
| `users` | Authentication and roles |
| `audit_log` | Automatic change tracking |

---

## Prerequisites

| Tool | Minimum Version |
|------|----------------|
| Java JDK | 17 |
| MySQL | 8.0 |
| Apache Maven | 3.8 |
| IDE (optional) | IntelliJ IDEA / Eclipse |

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Geonixa/{art}.git
cd {art}
```

### 2. Set Up the Database
```bash
mysql -u root -p < database/schema.sql
```

### 3. Configure Database Connection
```bash
cp src/main/resources/db.properties.example src/main/resources/db.properties
```
Edit `db.properties`:
```properties
db.url      = jdbc:mysql://localhost:3306/{d["domain"].lower()}_db?useSSL=false
db.username = root
db.password = your_password
```

### 4. Build the Project
```bash
mvn clean package -DskipTests
```

---

## Running the Application
```bash
java -jar target/{art}-2.0.0-jar-with-dependencies.jar
```

---

## Running Tests
```bash
# Run all tests
mvn test

# Run a specific test class
mvn test -Dtest={d["domain"]}ServiceTest

# Generate coverage report
mvn verify
```

---

## API / CLI Commands

When the application starts, use the interactive menu:

```
╔══════════════════════════════╗
║  {d["domain"]} Management System  ║
╠══════════════════════════════╣
║  1. Create new {e1:<17} ║
║  2. List all {e1}s{" ":<16} ║
║  3. Search {e1}s{" ":<18} ║
║  4. Update {e1}{" ":<19} ║
║  5. Delete {e1}{" ":<19} ║
║  6. Statistics{" ":<17} ║
║  0. Exit{" ":<24} ║
╚══════════════════════════════╝
```

---

## Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License
This project is released under the **MIT License** for educational purposes.

© 2024 Geonixa Platform — All engineering projects crafted with ❤️
'''

# ──────────────────────────────────────────────────────────────────────────────
# Build full sourceFiles list for one project
# ──────────────────────────────────────────────────────────────────────────────
def build_source_files(title, desc, stack):
    d = resolve_domain(title)
    p = pkg(title)
    base = 'src/main/java/' + p.replace('.', '/')

    def f(path, content):
        name = path.split('/')[-1]
        return {'path': path, 'name': name, 'content': content, 'size': len(content.encode('utf-8'))}

    files = [
        f(f'{base}/Main.java',                        gen_main(title, d, p)),
        f(f'{base}/model/{d["entity1"]}.java',        gen_entity(title, d, p, 1)),
        f(f'{base}/model/{d["entity2"]}.java',        gen_entity(title, d, p, 2)),
        f(f'{base}/model/{d["entity3"]}.java',        gen_entity(title, d, p, 3)),
        f(f'{base}/dao/{d["entity1"]}DAO.java',       gen_dao(title, d, p, 1)),
        f(f'{base}/dao/{d["entity2"]}DAO.java',       gen_dao(title, d, p, 2)),
        f(f'{base}/service/{d["domain"]}Service.java',gen_service(title, d, p)),
        f(f'{base}/controller/{d["entity1"]}Controller.java', gen_controller(title, d, p)),
        f(f'{base}/util/DatabaseUtil.java',           gen_db_util(p)),
        f('src/main/resources/db.properties.example', gen_db_properties(d)),
        f('src/main/resources/application.properties',gen_app_properties(title, d)),
        f('src/test/java/' + p.replace('.', '/') + f'/service/{d["domain"]}ServiceTest.java',
          gen_test(title, d, p)),
        f('database/schema.sql',                      gen_schema(title, d)),
        f('pom.xml',                                  gen_pom(title, d, p)),
        f('README.md',                                gen_readme(title, d, stack)),
    ]
    return files

# ──────────────────────────────────────────────────────────────────────────────
# Main — patch projects.json
# ──────────────────────────────────────────────────────────────────────────────
def is_java(p):
    return (p.get('category') == 'Java Projects' or
            any(t.lower() == 'java' for t in p.get('technologyStack', [])))

print("Loading projects.json ...")
with open(PROJECTS_JSON, 'r', encoding='utf-8') as f:
    projects = json.load(f)

updated = 0
for p in projects:
    if is_java(p):
        p['sourceFiles'] = build_source_files(
            p.get('title', 'Project'),
            p.get('shortDescription', ''),
            p.get('technologyStack', [])
        )
        updated += 1
        if updated % 20 == 0:
            print(f"  ... {updated} projects done")

print(f"Writing updated projects.json ({updated} Java projects enriched) ...")
with open(PROJECTS_JSON, 'w', encoding='utf-8') as f:
    json.dump(projects, f, indent=2, ensure_ascii=False)

print(f"\nDone! {updated} Java projects now have complete, unique source code.")
